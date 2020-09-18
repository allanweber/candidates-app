FROM nginx:alpine

 COPY home/runner/nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY home/runner/app /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
