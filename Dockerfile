FROM node:16
WORKDIR /usr/src/clean-node-api-course
COPY ./package.json .
RUN npm install --only=prod