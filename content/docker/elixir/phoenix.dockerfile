# Stage 0:
# Define required arguments and image
# -----------------------------------


FROM elixir:@{ELIXIR_VERSION}-alpine as source
ARG MIX_ENV=@{MIX_ENV}



# Stage 1:
# Set up env and compile the app
# ------------------------------


FROM source as build
ARG MIX_ENV
WORKDIR /build


# Install system dependencies
RUN apk add --no-cache \
      build-base \
      nodejs \
      nodejs-npm \
  && mix local.hex --force \
  && mix local.rebar --force


# Install frontend dependencies
COPY assets/package.json assets/package-lock.json ./assets/
RUN npm install --prefix assets


# Install and compile backend dependencies
COPY mix.exs mix.lock ./
COPY config config
RUN mix do deps.get, deps.compile


# Compile frontend app assets
COPY priv priv
COPY assets assets
RUN npm run --prefix assets deploy


# Compile backend app and build a release
COPY lib lib
COPY rel rel
RUN mix do compile, phx.digest
RUN mix release




# Stage 2:
# Serve the Application
# ---------------------


FROM source
ARG MIX_ENV
ENV MIX_ENV ${MIX_ENV}
ENV APP_NAME @{APP_NAME}


# Create user and limit permissions
RUN addgroup -S app && \
    adduser -S app app && \
    mkdir /app && \
    chown -R app: /app


# Install any system dependencies required by app at runtime
# (You can remove the following if none)
RUN apk add --no-cache imagemagick


# Copy the compiled elixir release from the previous stage
WORKDIR /app
COPY --from=build --chown=app:app /build/_build/${MIX_ENV}/rel/${APP_NAME} .

USER app
EXPOSE @{PORT}


# Start app
CMD ["bin/${APP_NAME}", "start"]
