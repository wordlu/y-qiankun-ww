FROM 172.21.32.2:8079/library/nginx:1.21.4

LABEL maintainer="dmz" \
      description="数据服务"

WORKDIR /usr/share/nginx/html/

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist/  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
