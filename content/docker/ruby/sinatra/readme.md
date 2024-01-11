To dockerize a simple Rack or Sinatra web app, save this Dockerfile in your the app's root directory,
and then run the following command to build the docker image:

```
$ docker build -t @{APP_NAME}:v1 .
```

To run the built docker image:

```
$ docker run -it --rm @{APP_NAME}:v1
```

Your Sinatra or Rack web app should now be accessible in the browser on the specified port.
