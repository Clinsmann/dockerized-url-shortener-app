FROM node:14-alpine

RUN mkdir /dockerized-url-shortener-app

ADD . /dockerized-url-shortener-app

WORKDIR /dockerized-url-shortener-app

COPY package.json /dockerized-url-shortener-app

RUN npm install

EXPOSE 80

CMD ["npm", "start"]