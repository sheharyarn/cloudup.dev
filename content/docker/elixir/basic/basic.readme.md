To use this Dockerfile for your Elixir application, save it in your root directory,
and run the following command to build the docker image:

```
$ docker build -t @{APP_NAME}:v1 .
```

To run the built docker image:

```
$ docker run -it --rm -p @{PORT}:@{PORT} @{APP_NAME}:v1
```

You should now be able to open the app in your browser on the specified port.
