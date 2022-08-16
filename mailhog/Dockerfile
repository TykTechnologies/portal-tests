FROM mailhog/mailhog:v1.0.1

USER root
RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

COPY ./certs/server.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates

EXPOSE 8025
EXPOSE 1025

USER mailhog