---
title: Build File
layout: default
---
The project and all subprojects that function as Stackwork modules should contain a `build.gradle` file applying the Stackwork plugin.

~~~ groovy
// build.gradle

// in the main project. Not needed in subprojects
plugins {
  id 'org.stackwork' version '0.6.0-rc.6'
}

// in subprojects. Not needed in the main project
apply plugin: 'stackwork'

version = '1.0'

stackwork {
  moduleType = DEFAULT
  
  // name for published image
  imageName = 'image-name'
  // the name can also include a namespace and repository
  imageName = 'stackwork/image-name'
  imageName = 'https://repo.stackwork.org:1337/stackwork/image-name'
  
  // if an image built in this module depends on one built in another 
  baseImageProject = (project)
  
  // a module can share another module's compose file
  composeProject = (project)
}

dependencies {
  // stackwork dependencies are supplied to the Dockerfile
  stackwork group: 'org.stackwork', name: 'name', version: '0.1', ext: 'tar.gz'
}
~~~

See the [module reference](/reference/modules/) for possible values for `moduleType`.
