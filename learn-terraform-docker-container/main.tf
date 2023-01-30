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
  name         = "cranky_solomon"
  keep_locally = false
}

resource "docker_container" "app" {
  image = cranky_solomon
  name  = "appTest"
  ports {
    internal = 80
    external = 3000
  }
}
