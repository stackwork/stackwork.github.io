---
title: Build, tag & publish
layout: default
---
Stackwork can be used as an opinionated *convention over configuration* plugin to build images using Gradle.

To make this work, include a [Dockerfile](https://docs.docker.com/engine/reference/builder/) in your projects home directory.
Also, specify that your project delivers a Docker image in the `build.gradle`.

~~~ groovy
// build.gradle

version = '1.0'
stackwork {
  moduleType = DELIVERABLE_IMAGE
  imageName = 'https://repo.stackwork.org:1337/stackwork/image-name'
}
~~~

The [Gradle tasks](/reference/gradle-tasks/) of interest are:

- buildImage
- tagImage
- pushImage

These tasks are logically dependent, so `gradle pushImage` will run all three. See the [reference](/reference/tasks/) for the task details.

The `imageName` will be tagged with the `version`. Our own practice is to use the 
[nebula release plugin](https://github.com/nebula-plugins/nebula-release-plugin) to generate the version automatically.
To push images to the [Docker Hub](https://hub.docker.com/), you need to include a name space in the image name. 
To push to your own repository, you add the domain as in the example.
Under the hood, a `docker push` is executed, so you can follow the rules you know.

## Use artifacts from a Nexus repository

When building a docker image, the docker project directory is uploaded to the Docker daemon. Stackwork makes sure your artifacts are 
available for the build, in the `build/stackwork-deps/` directory. 

~~~ groovy
// build.gradle

dependencies {
  // dependencies for image builds use the stackwork configuration:
  stackwork group: 'GROUP', name: 'NAME', version: 'VERSION'
}
~~~

~~~
# Dockerfile

FROM scratch
COPY build/stackwork-deps/NAME-VERSION.ext /
~~~

## Use artifacts from your build

Often, a project produces an artifact that should be copied into the final Docker image.
In such a case, simply make sure that the `buildImage` tasks depends on the gradle tasks that produce the artifact by configuring this in
the build file. Note that the artifact must be in the same directory as the Dockerfile, or a subdirectory of that.
