# Use the official Alpine Node.js base image
FROM node:@{NODE_VERSION}-alpine


# Set Environment variables
ARG NODE_ENV=@{DEFAULT_ENV}
ENV NODE_ENV=${NODE_ENV}


# Set the app directory
WORKDIR /app


# Install dependencies
COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force --loglevel=error


# Copy app source
COPY . .


# Start app
EXPOSE @{PORT}
CMD ["node", "@{APP_ENTRYPOINT}"]
