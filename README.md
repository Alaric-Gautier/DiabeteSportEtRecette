# Prisma CLI commands list

npx prisma

## Creation Prisma directory with schema.prisma file

npx prisma init

## Create SQL migration file and run it into DB (local or remote)

npx prisma migrate dev --name init

## Database visualzation (after migration)

npx prisma studio

## Pull the schema from an existing database, update schema.prisma file

npx prisma db pull

## Push the Prisma schema state to the database

npx prisma db push
