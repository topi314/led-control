FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app/dist /app
COPY package*.json ./
RUN npm install --only=prod
RUN apk --no-cache add curl

ENTRYPOINT ["node"]
CMD ["./app.js"]