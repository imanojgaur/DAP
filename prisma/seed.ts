import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "@/env";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
	connectionString: env.DIRECT_URL,
});

const prisma = new PrismaClient({
	adapter,
});

async function main() {
	console.log("🧹 Sweeping database...");
	await prisma.eventLog.deleteMany({});

	console.log("🌱 Seeding initial memory states...");
	await prisma.eventLog.createMany({
		data: [
			{ message: "SYSTEM: Database Initialized" },
			{ message: "SYSTEM: V8 Engine Ready" },
			{ message: "SYSTEM: React Reconciler Mounted" },
		],
	});

	console.log("✅ Seeding complete.");
}

main()
	.catch((e) => {
		console.error("Fatal Error during seeding:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
