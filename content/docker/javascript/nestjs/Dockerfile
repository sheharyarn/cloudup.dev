ARG NODE_VERSION="14"
FROM node:${NODE_VERSION}-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production --no-optional && npm cache clean --force --loglevel=error

COPY src src
COPY *.json ./

RUN npm run prebuild
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
