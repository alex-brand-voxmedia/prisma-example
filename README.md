# Getting started
- Start Docker Desktop
- npm install
- npm start

# Connecting to the database
View docker-compose.yaml

# VS Code
Downloand the Prisma Extension

Formatting Schema `npx prisma format` or use the VS Code Prisma extension (format on save feature)

# Seed file
`prisma/seed.ts` Prisma finds the seed from the package.json


# Migrate
https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate

`npx prisma migrate reset` reset the database (clear all the data), runs all migrations, runs seed 

`npx prisma migrate dev`
This command does two things:
1. It creates a new SQL migration file for this migration (prisma/migrations)
2. It runs the SQL migration file against the database
