FROM oven/bun:1 as base
WORKDIR /usr/src/app

COPY package.json    .
RUN bun install

RUN apt-get update -y 
RUN apt-get install -y iputils-ping

COPY src src 
ENV DB_NAME="SUVE"
ENV DB_USER="postgres"
ENV DB_PASSWORD="postgres"
ENV DB_PORT="5432"
ENV DB_HOST="postgres"
ENV DB_URL="postgres://postgres:postgres@postgres:5432/SUVE"
ENV resendKey="re_REZCRmNN_56BaLNburq14pDRo1HpLCGDe"
EXPOSE 3003

# CMD [ "bun", "log" ]
CMD [ "bun", "start" ]