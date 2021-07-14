FROM node:14-alpine

RUN mkdir /dockerized-url-shortener-app

ADD . /dockerized-url-shortener-app

WORKDIR /dockerized-url-shortener-app

RUN npm i

EXPOSE 80

CMD ["npm", "start"]