FROM node:lts as client

WORKDIR /app

COPY client  /app

RUN npm ci && \
    npm run build

FROM openjdk:15-slim

LABEL org.opencontainers.image.created https://github.com/joshuaavalon/warehouse
LABEL org.opencontainers.image.source https://github.com/joshuaavalon/warehouse
LABEL org.opencontainers.image.authors "Joshua Avalon"
LABEL org.opencontainers.image.url https://github.com/joshuaavalon/pical
LABEL org.opencontainers.image.documentation https://github.com/joshuaavalon/warehouse

WORKDIR /app

ENV APP_DATABASE_ADDR=
ENV APP_DATABASE_USERNAME=
ENV APP_DATABASE_PASSWORD=
ENV APP_DATABASE=

COPY server/ /app/
COPY --from=client /app/dist /app/src/main/resources/public

RUN chmod +x /app/gradlew && /app/gradlew assemble

ENTRYPOINT ["java", "-jar", "/app/build/libs/warehouse-1.0.0.jar"]
CMD []
