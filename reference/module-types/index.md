---
title: Module Types
layout: default
---
A Stackwork module should be configured to be of one of the following types in the [build file](/reference/build-file/).
If no type is set, the `DEFAULT` module type will be used, but that has no associated functionality. 

### TEST
Test module. Runs Java (or Groovy or Scala) tests against the Docker Compose setup. Does not build an image.

Is assumed to have applied the [JavaPlugin](https://docs.gradle.org/current/userguide/java_plugin.html).
The test task JVM will be enriched with runtime information for the services defined in the Docker Compose setup.

### TEST_IMAGE
Test image module. Builds a test image, and runs that against the Docker Compose setup.

### IMAGE
Image module. Any image needed in other modules docker compose setups can be created in an image module.

### DELIVERABLE_IMAGE
Image module for a deliverable image. For a deliverable image, tag and push tasks are created.

Often, the root project has this type, building the image under test.

Multiple modules can have this type, allowing to push multiple image in the same build job.

### COMPOSE
A Docker Compose module that supplies a Docker Compose stack definition.

The root project may be of this type, which makes sense if the Docker Compose file itself is the deliverable that you would like to test.

Any module can be of this type to supply the docker compose setup to multiple other modules.
