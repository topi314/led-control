FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM node:lts-alpine
RUN mkdir /app
COPY --from=build /app/dist /app
RUN apk --no-cache add curl

ENTRYPOINT ["node"]
CMD ["./app.js"]