resource "aws_security_group" "ecs_service" {
  name        = "${var.project}-ecs-${var.environment}"
  description = "Tareas Fargate de agentboard-ui - solo aceptan trafico del ALB compartido"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description     = "Desde el ALB compartido"
    from_port       = var.container_port
    to_port         = var.container_port
    protocol        = "tcp"
    security_groups = [data.aws_security_group.shared_alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
