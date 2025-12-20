FROM node:18-alpine

WORKDIR /app

# Instalar PostgreSQL client
RUN apk add --no-cache postgresql-client

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "dist/main"]
