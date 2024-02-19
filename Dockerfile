FROM node:lts-alpine as build
WORKDIR /app
RUN npm install -g @angular/cli
COPY package*.json /app/
RUN npm install
COPY . /app
RUN ng build --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/erp-frontend/browser/ /usr/share/nginx/html
COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf
