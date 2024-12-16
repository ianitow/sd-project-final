alias run-client="yarn workspace @sd-project/client dev"
alias run-server-m="yarn workspace @sd-project/server-management dev"
alias run-server="yarn workspace @sd-project/server dev"

node-version= v20.18.0
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
tsx --env-file=../server/.env --watch src/index.ts

yarn version 4.5.3
