FROM nginx:alpine

COPY /nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY /dist /usr/share/nginx/html

EXPOSE 4200 80 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]
# CMD ["nginx", "-g", "daemon off;"]
