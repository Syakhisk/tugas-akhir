docker run \
    --name my-caddy \
    --rm \
    --network host \
    -v $PWD/Caddyfile:/etc/caddy/Caddyfile \
    -v caddy_data:/data \
    caddy:2.6.4-alpine
