## `Tiny url app`

Requirements to run the project locally
1.  Ensure you have docker installed on your PC, and it is running!

### `To run the application`

cd into the project root folder and run

      docker-compose up

Done! The app is ready for us locally

### `To stop the application`

cd into the project root folder and run

      docker-compose down

### `To access the endpoints`

Access the endpoint locally via

1. To encode a url: eg. GET [http://localhost:8000/encode?url=https://google.com](http://localhost:8000/encode?url=https://google.com)

         returns eg. 127.0.0.0:8000/je43j~12

2. To decode the url [http://localhost:8000/decode/je43j~12](http://localhost:8000/decode/je43j~12)


3. To visit the url (will redirect) [http://localhost:8000/je43j~12](http://localhost:8000/je43j~12)


4. To view statistics [http://localhost:8000/statistics/je43j~12](http://localhost:8000/statistics/je43j~12)


### `To run test locally`

NB: You need to start up the application following the command specified above.

This is because the database used is hosted in the same container. To test run

      run npm test