# Use the official Alpine Ruby base image
FROM ruby:@{RUBY_VERSION}-alpine


# Set Environment variables
ARG RACK_ENV=@{DEFAULT_ENV}
ENV RACK_ENV=${RACK_ENV}


# Set the app directory
WORKDIR /app


# Install dependencies
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install --system


# Copy app source
COPY . .


# Start app
EXPOSE @{PORT}
CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0"]
