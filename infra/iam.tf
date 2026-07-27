data "aws_iam_policy_document" "ecs_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# Execution role: usado por el agente de ECS para arrancar la tarea (pull de ECR,
# escribir logs). No hay secrets de Secrets Manager que leer (a diferencia de
# agentboard-api) porque la UI no maneja credenciales propias.
resource "aws_iam_role" "ecs_execution" {
  name               = "${var.project}-ecs-execution-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume_role.json
}

resource "aws_iam_role_policy_attachment" "ecs_execution_managed" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Task role vacio a proposito: Next.js no llama APIs de AWS directamente, solo
# hace fetch server-side al backend via AGENTBOARD_API_URL.
resource "aws_iam_role" "ecs_task" {
  name               = "${var.project}-ecs-task-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume_role.json
}
