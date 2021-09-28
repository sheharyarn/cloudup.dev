# Use the official Alpine Ruby base image
FROM ruby:@{RUBY_VERSION}-alpine


# Set the app directory
WORKDIR /app


# Install dependencies
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install --system


# Copy app source
COPY . .


# Start app
CMD ["ruby", "./@{ENTRYPOINT}"]
