# Warehouse Server

Warehouse server that build with Spring Boot.

Note that this guide assumes you are running commands from this directory.

## Requirements

- Java 15
- PostgreSQL 9.6+

## Preparation

### Client

You need [build the client](../client/README.md) and put it in `src/main/resources/public`.

### Database

You also need to initialize the database before the server started.

You can run the SQL queries in `database` directly or use some kinds of database migration tools.
The naming follows [Flyway](https://flywaydb.org/) standard, but you are not required to use Flyway.

For Flyway, you can run

```
flyway migrate -url=<url> -user=<user> -password=<password> -locations=filesystem:database
```

## Getting Started

### Build

```
./gradlew assemble
```

This should output at `server/build/libs/warehouse-1.0.0.jar`.

### Start

The server is configured by environment variables.

- `APP_DATABASE_ADDR`: Database URL
- `APP_DATABASE_USERNAME`: Database user name
- `APP_DATABASE_PASSWORD`: Database password
- `APP_DATABASE`: Database name

```
java -jar warehouse-1.0.0.jar
```

## API

All the API is under `/api`. All request and response are assumed in JSON unless specified otherwise.

### Location

#### GET /api/location

Return all locations.

##### Request

N/A

##### Response

```json
{
  "data": [
    {
      "id": 1,
      "code": "KLN",
      "name": "Kowloon"
    }
  ]
}
```

#### POST /api/location

Create a location.

##### Request

```json
{
  "code": "KLN",
  "name": "Kowloon"
}
```

##### Response

```json
{
  "data": {
    "id": 1,
    "code": "KLN",
    "name": "Kowloon"
  }
}
```

#### PUT /api/location/<id>

Update a location.

##### Request

```json
{
  "code": "KLN",
  "name": "Kowloon"
}
```

##### Response

```json
{
  "data": {
    "id": 1,
    "code": "KLN",
    "name": "Kowloon"
  }
}
```

#### Delete /api/location/<id>

Delete a location.

##### Request

N/A

##### Response

```json
{
  "data": true
}
```

#### POST /api/location/csv

Create locations via uploading a CSV file.

##### Request

You should post the CSV file via multipart with the in the `file` field.

The format should be

```csv
<code>,<name>
```

##### Response

```json
{
  "data": true
}
```

### Product

#### GET /api/product

Return all products.

##### Request

N/A

##### Response

```json
{
  "data": [
    {
      "id": 1,
      "code": "PEN",
      "name": "Blue Pen"
    }
  ]
}
```

#### POST /api/product

Create a product.

##### Request

```json
{
  "code": "PEN",
  "name": "Blue Pen"
}
```

##### Response

```json
{
  "data": {
    "id": 1,
    "code": "PEN",
    "name": "Blue Pen"
  }
}
```

#### PUT /api/product/<id>

Update a product.

##### Request

```json
{
  "code": "PEN",
  "name": "Blue Pen"
}
```

##### Response

```json
{
  "data": {
    "id": 1,
    "code": "PEN",
    "name": "Blue Pen"
  }
}
```

#### Delete /api/product/<id>

Delete a product.

##### Request

N/A

##### Response

```json
{
  "data": true
}
```

#### POST /api/product/csv

Create products via uploading a CSV file.

##### Request

You should post the CSV file via multipart with the in the `file` field.

The format should be

```csv
<code>,<name>
```

##### Response

```json
{
  "data": true
}
```

### Storage

#### GET /api/storage

Return all storages.

##### Request

N/A

##### Response

```json
{
  "data": [
    {
      "id": 1,
      "location": {
        "id": 1,
        "code": "KLN",
        "name": "Kowloon"
      },
      "product": {
        "id": 1,
        "code": "PEN",
        "name": "Blue Pen"
      },
      "amount": 3
    }
  ]
}
```

#### POST /api/storage

Create a storage.

##### Request

```json
{
  "location": {
    "id": 1
  },
  "product": {
    "id": 1
  },
  "amount": 3
}
```

##### Response

```json
{
  "data": {
    "id": 1,
    "location": {
      "id": 1,
      "code": "KLN",
      "name": "Kowloon"
    },
    "product": {
      "id": 1,
      "code": "PEN",
      "name": "Blue Pen"
    },
    "amount": 3
  }
}
```

#### PUT /api/storage/<id>

Update a storage.

##### Request

```json
{
  "location": {
    "id": 1
  },
  "product": {
    "id": 1
  },
  "amount": 3
}
```

##### Response

```json
{
  "data": {
    "id": 1,
    "location": {
      "id": 1,
      "code": "KLN",
      "name": "Kowloon"
    },
    "product": {
      "id": 1,
      "code": "PEN",
      "name": "Blue Pen"
    },
    "amount": 3
  }
}
```

#### Delete /api/storage/<id>

Delete a storage.

##### Request

N/A

##### Response

```json
{
  "data": true
}
```

#### POST /api/storage/csv

Create storages via uploading a CSV file.

##### Request

You should post the CSV file via multipart with the in the `file` field.

The format should be

```csv
<locationId>,<productId>,<amount>
```

##### Response

```json
{
  "data": true
}
```
