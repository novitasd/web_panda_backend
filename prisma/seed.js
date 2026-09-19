import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

    const email = "panda@gmail.com";

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        console.log("El administrador ya existe.");
        return;
    }

    const password = await bcrypt.hash("panda2026web@*", 12);

    await prisma.user.create({
        data: {
            name: "Administrador",
            email,
            password,
            role: "ADMIN"
        }
    });

    console.log("Administrador creado correctamente.");

}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });