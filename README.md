# Pafin API

A basic API containing endpoints related to authentication and user entity.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Documentation](#documentation)

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.16.0)
- [npm](https://www.npmjs.com/) (v9.5.1)
- [Postgresql](https://www.postgresql.org/) (v14.8)

## Setup

1. Clone the repository

```bash
git clone <repo-url>
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables

```bash
DATABASE_URL="postgres://<username>:<password>@<host>:<port>/<database>"
JWT_SECRET="<secret>"

# Generate a secret using the following command
# openssl rand -hex 48
```

4. Create the database table

```bash
CREATE TABLE "public"."user" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    PRIMARY KEY ("id")
);
```

5. Start the server

```bash
npm run serve
```

## Documentation

The API documentation can be found in the [docs](./docs) directory. It needs to be imported into [Postman](https://www.postman.com/) to be viewed.
