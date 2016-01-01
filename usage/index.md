---
title: Usage
layout: default
---
## Building and publishing an image
Stackwork can be used as an opinionated *convention over configuration* plugin to build images using Gradle.
Specify that your project delivers a Docker image in the `build.gradle`:

~~~ groovy
// build.gradle

version = '1.0'
stackwork {
  moduleType = DELIVERABLE_IMAGE
  imageName = 'https://repo.stackwork.org:1337/stackwork/image-name'
}
~~~

The Gradle tasks of interest are:
- buildImage
- tagImage
- pushImage

These tasks are logically dependent, so `gradle pushImage` will run all three. See the [reference](/reference) for the task details.

The `imageName` will be tagged with the `version`. Our own practice is to use the 
[nebula release plugin](https://github.com/nebula-plugins/nebula-release-plugin) to generate the version automatically.
To be able to push images you will need to include a name space in the image name (resulting in a push to the
[Docker Hub](https://hub.docker.com/). To use your own repository, include that in the image name as well.
