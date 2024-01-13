To use this Dockerfile for your BunJS backend application,
save the `Dockerfile` and `.dockerignore` in your project's
root directory.

You can now run the following command to build the docker image:

```
$ docker build --pull -t {APP_NAME} .
```

The `-t` flag lets us specify a name for the image, and `--pull` tells Docker to automatically download the latest version of the base image (oven/bun).

To run the built docker image:

```
$ docker run -it -p @{PORT}:@{PORT} {APP_NAME}
```

You should now be able to open the app in your browser on the specified port.
