terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "app" {
  name         = "node:14-alpine"
  keep_locally = false
}

resource "docker_container" "app" {
  image = node:14-alpine
  name  = "appTest"
  ports {
    internal = 80
    external = 3000
  }
}
