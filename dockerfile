FROM nginx:latest
LABEL younccat "zzhbbdbbd@163.com"

ADD /docker/nginx.conf /etc/nginx

RUN mkdir -p /usr/share/nginx/html
ADD /client/build/ /usr/share/nginx/html

EXPOSE 80
