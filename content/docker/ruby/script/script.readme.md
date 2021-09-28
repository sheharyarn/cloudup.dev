Dockerize basic Ruby scripts and apps by saving this Dockerfile in your the app's root directory,
and then run the following command to build the docker image:

```
$ docker build -t @{APP_NAME}:v1 .
```

To run the built docker image:

```
$ docker run -it --rm @{APP_NAME}:v1
```

Your script or app should now be automatically started.
