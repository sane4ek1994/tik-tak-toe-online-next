import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.game.create({
    data: {
      name: "Game-1",
    },
  });
  await prisma.game.create({
    data: {
      name: "Game-2",
    },
  });
  await prisma.game.create({
    data: {
      name: "Game-3",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
