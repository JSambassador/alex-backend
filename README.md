# Auth System TypeScript Express

This is a sample Node.js application with Express, TypeScript, Prisma, JWT authentication, and Swagger for API documentation.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file and add your environment variables.
4. Run Prisma migrations: `npx prisma migrate dev`
5. Seed the database: `npm run seed`
6. Start the server: `npm start`

## API Documentation

API documentation is available at `http://localhost:3000/api-docs`.

## Scripts

- `npm start`: Start the server.
- `npm run seed`: Seed the database.
- `npm run test`: Run tests.
- `npm run build`: Build the project.
*


### Full Project Structure

Here's the full structure of the project:

```
my-app/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── controllers/
│   │   ├── auth.ts
│   │   ├── portfolio.ts
│   │   └── user.ts
│   ├── middlewares/
│   │   └── validateRequest.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── portfolio.ts
│   │   └── user.ts
│   ├── services/
│   │   ├── auth.ts
│   │   ├── portfolio.ts
│   │   └── user.ts
│   ├── utils/
│   │   └── jwt.ts
│   ├── index.ts
│   └── swagger.ts
├── package.json
├── tsconfig.json
└── README.md


```

<p align="center">
  <img src="https://user-images.githubusercontent.com/1502352/213929848-293a0de7-d935-4744-859e-c6572dd97d10.png" width="600" align="center">
  <p align="center">Admin Dashboard</p>
</p>

---
