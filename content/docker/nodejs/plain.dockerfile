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


# Create non-root user and limit access
RUN addgroup -S app && \
    adduser -S app app && \
    chown -R app: /app

USER app
EXPOSE @{PORT}


# Start app
CMD ["node", "@{APP_ENTRYPOINT}"]
