FROM node:12-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3333
CMD ["npm", "run", "start:prod"]