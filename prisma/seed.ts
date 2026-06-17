import { config } from "dotenv";

config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

if (!process.env.DIRECT_URL) {
	throw new Error(
		"CRITICAL: DIRECT_URL is undefined. Ensure your .env file exists and the path is correct.",
	);
}

const adapter = new PrismaPg({
	connectionString: process.env.DIRECT_URL,
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
