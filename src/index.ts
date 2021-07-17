import "reflect-metadata";
import dotenv from "dotenv";
import { createConnection } from "typeorm";

import app from "./app";
import config from "./connection/connection";

dotenv.config();
const port = process.env.PORT || 5000;

createConnection(config)
  .then(() => {
    app.listen(port, () =>
      console.log(
        `app is now running on port ${port} in ${process.env.NODE_ENV} mode`
      )
    );
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
