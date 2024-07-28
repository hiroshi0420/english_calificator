# build environment
FROM node:18-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent --legacy-peer-deps
RUN npm install react-scripts@4.0.1 -g --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.19.6-alpine as nginx-build

ARG HEADERS_MORE_VERSION=v0.33

RUN apk --update --no-cache add \
        gcc \
        make \
        libc-dev \
        g++ \
        openssl-dev \
        linux-headers \
        pcre-dev \
        zlib-dev \
        libtool \
        automake \
        autoconf \
        git

RUN git clone --depth 1 -b $HEADERS_MORE_VERSION --single-branch https://github.com/openresty/headers-more-nginx-module.git /opt/headers-more-nginx-module \
    && cd /opt/headers-more-nginx-module \
    && git submodule update --init

RUN wget -O - http://nginx.org/download/nginx-1.19.6.tar.gz | tar zxfv - -C /opt/ \
    && mv /opt/nginx-1.19.6 /opt/nginx \
    && cd /opt/nginx \
    && ./configure --with-compat --add-dynamic-module=/opt/headers-more-nginx-module \
    && make modules  

FROM nginx:1.19.6-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=nginx-build /opt/nginx/objs/ngx_http_headers_more_filter_module.so /usr/lib/nginx/modules/ngx_http_headers_more_filter_module.so

RUN chmod -R 644 /usr/lib/nginx/modules/ngx_http_headers_more_filter_module.so \
    && sed -i '1iload_module /usr/lib/nginx/modules/ngx_http_headers_more_filter_module.so;' /etc/nginx/nginx.conf 

RUN rm /etc/nginx/conf.d/default.conf
COPY Docker/prod/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
