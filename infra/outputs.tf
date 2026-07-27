output "ui_url" {
  description = "URL publica de agentboard-ui (ALB compartido con agentboard-api, puerto distinto)"
  value       = "http://${data.aws_lb.shared.dns_name}:${var.alb_public_port}"
}

output "ecr_repository_url" {
  value = aws_ecr_repository.ui.repository_url
}

output "ecs_cluster_name" {
  value = data.aws_ecs_cluster.shared.cluster_name
}

output "ecs_service_name" {
  value = aws_ecs_service.ui.name
}

output "github_actions_role_arn" {
  description = "Configuralo como AWS_ROLE_ARN en los secrets del repo de GitHub"
  value       = aws_iam_role.github_actions_deploy.arn
}
