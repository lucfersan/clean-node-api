FROM node:14
WORKDIR /usr/src/clean-node-api
RUN yarn install --prod
