# FROM nginx:alpine

# COPY /nginx/default.conf /etc/nginx/conf.d/

# RUN rm -rf /usr/share/nginx/html/*

# COPY /dist /usr/share/nginx/html

# # EXPOSE 4200 80 8080
# EXPOSE 80

# # ENTRYPOINT ["nginx", "-g", "daemon off;"]6
# CMD ["nginx", "-g", "daemon off;"]


FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY /nginx/default.conf /etc/nginx/nginx.template
RUN rm -rf /usr/share/nginx/html/*
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY /dist /usr/share/nginx/html
