FROM node:12.13.1

WORKDIR /app

copy package*.json ./

run npm install

copy . .

CMD [ "npm", "start" ]