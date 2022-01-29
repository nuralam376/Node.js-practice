FROM node:carbon

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000 9204

cmd ["npm", "run", "start:dev"]