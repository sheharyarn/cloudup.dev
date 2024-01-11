To use this Dockerfile for your NestJS backend application,
first update your `package.json` file to add the following
scripts:

- `prebuild`
- `build`
- `start`

Then save the `Dockerfile` and `.dockerignore` in your project's
root directory.

You can now run the following command to build the docker image:

```
$ docker build -t @{APP_NAME}:v1 .
```

To run the built docker image:

```
$ docker run -it --rm -p @{PORT}:@{PORT} @{APP_NAME}:v1
```

You should now be able to open the app in your browser on the specified port.
