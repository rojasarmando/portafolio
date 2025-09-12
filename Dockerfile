FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache bash
CMD ["sh"]