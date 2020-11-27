# Warehouse

[![GitHub Actions][actions-badge]][actions]

The application is separated is server and client. You can read their `README.md` respectively.

## Getting Started

If you want to build and run it yourself, you can refer to [server](server/README.md) and [client](client/README.md) document.

If you want to run it without building, you can use the docker.

Here is example `docker-compose.yml`:

```yaml
version: "3.1"

services:
  db:
    image: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: admin
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
    ports:
      - 5432:5432
  adminer:
    image: ghcr.io/joshuaavalon/warehouse:master
    environment:
      APP_DATABASE_ADDR: db
      APP_DATABASE: admin
      APP_DATABASE_USERNAME: admin
      APP_DATABASE_PASSWORD: admin
    ports:
      - 9053:8081
    depends_on:
      - db
volumes:
  pgdata:
```

Note that you still need to migrate PostgreSQL database first. Please refer to the server document.

## Known Issues

As this application is built in a short time, edge cases, error handling,

[actions-badge]: https://github.com/joshuaavalon/warehouse/workflows/Main/badge.svg
[actions]: https://github.com/joshuaavalon/warehouse/actions
