# Build the release
# -----------------

FROM elixir:@{ELIXIR_VERSION}-alpine as build
ENV MIX_ENV=@{MIX_ENV}

# Install Hex and Rebar
WORKDIR /source
RUN mix local.hex --force && mix local.rebar --force

# Install and compile dependencies.
#
# This is done before compiling the full app so they are
# cached and don't need to be re-compiled everytime the
# docker image is rebuilt (unless they're changed)
COPY mix.exs mix.lock ./
COPY config config
RUN mix do deps.get, deps.compile

# Compile and build the app
COPY . .
RUN mix do compile, release


# Run the app
# -----------

# The application is run in a separate stage so the source
# code and other build-time dependencies are not included

FROM elixir:@{ELIXIR_VERSION}-alpine
EXPOSE @{PORT}

ENV MIX_ENV=@{MIX_ENV}
ENV APP_NAME=@{APP_NAME}

WORKDIR /app
COPY --from=build /source/_build/${MIX_ENV}/rel/${APP_NAME} .

CMD ["bin/${APP_NAME}", "start"]

