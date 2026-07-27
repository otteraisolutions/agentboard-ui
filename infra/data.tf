# Recursos que ya existen porque los creo agentboard-api (mismo VPC por defecto,
# mismo cluster ECS, mismo ALB) - agentboard-ui NO los crea, solo los referencia.

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

data "aws_caller_identity" "current" {}

data "aws_ecs_cluster" "shared" {
  cluster_name = var.shared_cluster_name
}

data "aws_lb" "shared" {
  name = var.shared_alb_name
}

data "aws_security_group" "shared_alb" {
  filter {
    name   = "group-name"
    values = [var.shared_alb_security_group_name]
  }
}
