# Warehouse Client

Warehouse client that build with TypeScript, React, and Material-UI.

Note that this guide assumes you are running commands from this directory.

## Requirements

- Node.js 14+

## Preparation

### Dependencies

```
npm install
```

## Getting Started

### Build

```
npm run build
```

This should output at `dist/`. You should copy the content to `../server/src/main/resources/` for building the server.

### Development

When you are in development, you can run by

```
npm run start
```

You can access the client from `http://localhost:8080`.

Note that you also need the server to be running for the function to work. It assumes the server is running on `http://localhost:8081`, but it can be changed at `config/webpack.config.dev.js`.
