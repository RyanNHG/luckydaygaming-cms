FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --silent
CMD [ "npm", "run", "dev" ]
