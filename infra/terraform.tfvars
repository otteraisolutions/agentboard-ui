# Completado con los valores reales de la cuenta AWS (758222924965) y el ALB de
# agentboard-api. Sin secretos aqui a proposito - agentboard-ui no usa DB ni
# JWT_SECRET propios.

aws_region  = "us-east-1"
environment = "prod"

agentboard_api_url = "http://agentboard-api-prod-1404285574.us-east-1.elb.amazonaws.com"

# La imagen ":initial" todavia no existe en el primer apply - la tarea ECS va a
# fallar temporalmente hasta construirla y subirla a mano, es esperado.
container_image = "758222924965.dkr.ecr.us-east-1.amazonaws.com/agentboard-ui-prod:initial"
