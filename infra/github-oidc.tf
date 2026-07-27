# Reutiliza el mismo proveedor OIDC que ya existe en la cuenta (creado por
# agentboard-api), AWS solo permite un proveedor OIDC por URL/cuenta.

variable "github_repository" {
  description = "org/repo exacto que puede asumir el rol de deploy, ej. otteraisolutions/agentboard-ui"
  type        = string
  default     = "otteraisolutions/agentboard-ui"
}

data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

data "aws_iam_policy_document" "github_actions_assume" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    # Dos formas del claim "sub": un job normal en push a main manda
    # "ref:refs/heads/main", pero un job con "environment: production" (el apply
    # de infra-backend.yml) manda "environment:production" en su lugar.
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values = [
        "repo:${var.github_repository}:ref:refs/heads/main",
        "repo:${var.github_repository}:environment:production",
      ]
    }
  }
}

resource "aws_iam_role" "github_actions_deploy" {
  name               = "${var.project}-github-actions-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.github_actions_assume.json
}

resource "aws_iam_role_policy" "github_actions_deploy" {
  name = "deploy-permissions"
  role = aws_iam_role.github_actions_deploy.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "EcrPush"
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
        ]
        Resource = "*"
      },
      {
        Sid    = "EcsDeploy"
        Effect = "Allow"
        Action = [
          "ecs:DescribeServices",
          "ecs:DescribeTaskDefinition",
          "ecs:RegisterTaskDefinition",
          "ecs:UpdateService",
        ]
        Resource = "*"
      },
      {
        Sid      = "PassTaskRoles"
        Effect   = "Allow"
        Action   = "iam:PassRole"
        Resource = [aws_iam_role.ecs_execution.arn, aws_iam_role.ecs_task.arn]
      },
      {
        # Necesario solo si el pipeline de infraestructura corre "terraform apply"
        # (ver .github/workflows/infra-backend.yml). Acotado a los tipos de recurso
        # que este modulo administra, no acceso administrativo completo. No incluye
        # rds/secretsmanager (agentboard-ui no los usa).
        Sid    = "TerraformManagedResources"
        Effect = "Allow"
        Action = [
          "ecs:*", "ecr:*", "elasticloadbalancing:*",
          "logs:*", "ec2:Describe*",
        ]
        Resource = "*"
      },
      {
        Sid      = "TerraformIamForThisProject"
        Effect   = "Allow"
        Action   = ["iam:*"]
        Resource = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/${var.project}-*"
      }
    ]
  })
}
