FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY docs/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
