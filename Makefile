start-db:
	docker-compose up -d db

migrate-dev:
	npx prisma migrate dev

create-migration:
	npx prisma migrate dev --create-only