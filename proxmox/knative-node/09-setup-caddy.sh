docker run -d \
    --name my-caddy \
    -p 80:80 \
    -p 443:443 \
    -v $PWD/Caddyfile:/etc/caddy/Caddyfile \
    -v caddy_data:/data \
    caddy:2.6.4-alpine
