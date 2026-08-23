resource "aws_ecs_task_definition" "ui" {
  family                   = "${var.project}-${var.environment}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.task_cpu
  memory                   = var.task_memory
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "ui"
      image     = var.container_image
      essential = true
      portMappings = [
        { containerPort = var.container_port, protocol = "tcp" }
      ]
      environment = [
        { name = "AGENTBOARD_API_URL", value = var.agentboard_api_url },
        { name = "REFRESH_TOKEN_TTL_DAYS", value = tostring(var.refresh_token_ttl_days) },
        { name = "PORT", value = tostring(var.container_port) },
        { name = "COOKIE_SECURE", value = var.cookie_secure },
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ui.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ui"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "ui" {
  name            = "${var.project}-${var.environment}"
  cluster         = data.aws_ecs_cluster.shared.id
  task_definition = aws_ecs_task_definition.ui.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_service.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.ui.arn
    container_name   = "ui"
    container_port   = var.container_port
  }

  # El pipeline de CI/CD actualiza la imagen registrando una nueva revision de la
  # task definition y llamando update-service; no queremos que "terraform apply"
  # pise ese despliegue si container_image no cambio en el propio codigo de infra.
  lifecycle {
    ignore_changes = [task_definition]
  }

  depends_on = [aws_lb_listener.ui_http]
}
