This app contains two separate applications.

- Frontend Nextjs (ShadCN UI + FSD)
- Backend Nestjs (TypeORM + Postgres)

### How to start

1. Make sure you have docker installed
   <https://www.docker.com/products/docker-desktop/>

2. Copy `.env.example` file and fill in the missing environment variables.
```sh
cp .env.example .env
```
3. Update WEB3_NODE variable with your value.
```
WEB3_NODE=
```
4. Run all services through docker compose
```bash
docker compose up --build
```
Or
```bash
docker-compose up --build
```
(depending on Docker version)

### What's next

* The FE is available at <http://localhost:3000>
* The BE is available at <http://localhost:3001>
