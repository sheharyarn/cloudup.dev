Containerize your Python web applications developed with Flask with Docker
by saving this Dockerfile in your the app's root directory.

Then, run the following command to build the docker image:

```
$ docker build -t @{APP_NAME}:v1 .
```

And to finally start the server:

```
$ docker run -it --rm -p @{PORT}:@{PORT} @{APP_NAME}:v1
```

Your Flask app should now be accessible from your browser on the specified port.
