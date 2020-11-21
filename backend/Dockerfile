FROM node:lts-alpine as build
WORKDIR /app
COPY package.json package.json
RUN npm ci
COPY . /app
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app/dist /app
COPY package*.json ./
RUN npm ci --only=production
RUN apk --no-cache add curl

ENTRYPOINT ["node"]
CMD ["./app.js"]