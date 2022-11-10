FROM node:v16.17.0-alpine3.14

# Create app directory
WORKDIR /back-office-plus

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

ENV	PORT=3001

EXPOSE 3001

CMD [ "npm", "start" ]

