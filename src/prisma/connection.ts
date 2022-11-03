import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;



// model User {
// 	id        Int      @id @default(autoincrement())
// 	createdAt DateTime @default(now())
// 	email     String   @unique
// 	name      String?
// 	role      Role     @default(USER)
// 	posts     Post[]
//   }
  
//   model Post {
// 	id        Int      @id @default(autoincrement())
// 	createdAt DateTime @default(now())
// 	updatedAt DateTime @updatedAt
// 	published Boolean  @default(false)
// 	title     String   @db.VarChar(255)
// 	author    User?    @relation(fields: [authorId], references: [id])
// 	authorId  Int?
//   }