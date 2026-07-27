resource "aws_lb_target_group" "ui" {
  name        = "${var.project}-${var.environment}"
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "ip"

  health_check {
    path                = "/"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    interval            = 15
    timeout             = 5
    matcher             = "200"
  }

  # Da tiempo a que las conexiones en curso terminen antes de matar la tarea vieja
  # en un deployment - evita cortar requests a mitad de camino.
  deregistration_delay = 30
}

# Listener nuevo en el MISMO ALB que usa agentboard-api (puerto 80), en un puerto
# distinto para no chocar con el backend. Requiere que el security group del ALB
# compartido (agentboard-api/infra/security_groups.tf) permita entrada en este
# puerto - si no se agrego ese cambio ahi, este listener queda creado pero
# inalcanzable desde afuera.
resource "aws_lb_listener" "ui_http" {
  load_balancer_arn = data.aws_lb.shared.arn
  port              = var.alb_public_port
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ui.arn
  }
}
