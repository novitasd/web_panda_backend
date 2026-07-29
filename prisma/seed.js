import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

    const email = "admin@tnis.pe";

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        console.log("El administrador ya existe.");
        return;
    }

    const password = await bcrypt.hash("Admin123*", 12);

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