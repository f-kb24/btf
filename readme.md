1. in the root directory, run `docker-compose up --build` - this will build a clean postgres database
2. if you want to use your own database `/backend/.env` has the environment variable `DATABASE_URL`. change that to your postgres database url
3. run `npm install` in both `front` and `backend` folders
4. run `npx prisma migrate dev --name init` to make initial database migrations
5. run `npm run dev` in `/backend`
6. run `npm run start` in `/front`
