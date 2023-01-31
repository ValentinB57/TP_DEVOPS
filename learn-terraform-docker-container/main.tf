terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"    
      version = "~> 2.13.0"
    }
  }
}

provider "docker" {
  # Configuration options
  host = "npipe:////.//pipe//docker_engine"
}

resource "docker_image" "app" {
  name         = "node:14-alpine"
  keep_locally = false
}

# Create a docker image resource
resource "docker_image" "react_image" {               
  name = "react_image"
  build {  
    path = "../react-docker"
    dockerfile = "app.dockerfile"
  }
}


# Create a docker container resource
resource "docker_container" "tpdevops" {   
  # the name of the container
  name = "tpdevops"  
  image = docker_image.react_image.image_id
    ports {
    internal = "80"
    external = "8080"
  }
}

resource "docker_container" "tpdevops" {
  image = "tpdevops:latest"
  name  = "tpdevops"
  restart = "always"
  ports {
    internal = 80
    external = 3000
  }
}
