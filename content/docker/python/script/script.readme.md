To use this Dockerfile for basic Python scripts and apps, save it in your the app's root directory,
and run the following command to build the docker image:

```
$ docker build -t @{APP_NAME}:v1 .
```

To run the built docker image:

```
$ docker run -it --rm @{APP_NAME}:v1
```

Your script or app should now be automatically started.
