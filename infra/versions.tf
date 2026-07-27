terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Mismo bucket/tabla de lock que agentboard-api, key distinta - cada proyecto
  # tiene su propio archivo de estado dentro del mismo bucket.
  backend "s3" {
    bucket         = "agentboard-terraform-state-758222924965"
    key            = "agentboard-ui/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "agentboard-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}
