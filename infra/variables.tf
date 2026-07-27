variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project" {
  description = "Prefijo usado en el nombre de todos los recursos propios de agentboard-ui."
  type        = string
  default     = "agentboard-ui"
}

variable "environment" {
  type    = string
  default = "prod"
}

variable "container_port" {
  description = "Puerto en el que escucha Next.js (server.js del build standalone)."
  type        = number
  default     = 3000
}

variable "task_cpu" {
  type    = number
  default = 256
}

variable "task_memory" {
  type    = number
  default = 512
}

variable "desired_count" {
  type    = number
  default = 2
}

variable "shared_cluster_name" {
  description = "Cluster ECS de agentboard-api, donde corre tambien este servicio."
  type        = string
  default     = "agentboard-prod"
}

variable "shared_alb_name" {
  description = "ALB de agentboard-api, reutilizado con un listener nuevo para exponer la UI."
  type        = string
  default     = "agentboard-api-prod"
}

variable "shared_alb_security_group_name" {
  description = "Security group del ALB compartido - debe permitir entrada en alb_public_port (ver nota en agentboard-api/infra/security_groups.tf)."
  type        = string
  default     = "agentboard-alb-prod"
}

variable "alb_public_port" {
  description = "Puerto del listener nuevo en el ALB compartido donde queda expuesta la UI (el 80 ya lo usa agentboard-api)."
  type        = number
  default     = 3000
}

variable "agentboard_api_url" {
  description = "URL del backend agentboard-api (usada server-side por los Route Handlers de Next.js, ver alb_dns_name en el output de agentboard-api)."
  type        = string
}

variable "refresh_token_ttl_days" {
  description = "Debe coincidir con JWT_REFRESH_TTL_DAYS configurado en agentboard-api."
  type        = number
  default     = 14
}

variable "container_image" {
  description = "Imagen completa (repo:tag) a desplegar. En el primer apply usa un tag inicial construido a mano."
  type        = string
}
