resource "aws_cloudwatch_log_group" "ui" {
  name              = "/ecs/${var.project}-${var.environment}"
  retention_in_days = 30
}
