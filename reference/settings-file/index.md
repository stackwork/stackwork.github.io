---
title: Settings File
layout: default
---
Stackwork utilizes Gradle's [multiproject ](https://docs.gradle.org/current/userguide/multi_project_builds.html) feature.
Stackwork modules are defined as Gradle subprojects. Your project should contain a `settings.gradle` in which all
modules are imported. For instance, a project with subprojects `module-1` and `module-2` has a project directory containing the
subdirectories `module-1` and `module-2` and a settings file:

~~~ groovy
// settings.gradle
include 'module1', 'module-2'
~~~
