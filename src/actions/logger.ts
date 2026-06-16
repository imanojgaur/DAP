"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

// 1. Fetch current logs at render time
export async function getLogsAction() {
  return await prisma.eventLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}

// 2. The Side Effect: Write to the database
export async function writeLogAction(source: "NAKED" | "QUARANTINED") {
  await prisma.eventLog.create({
    data: { message: `Execution fired from: ${source}` },
  });
  
  // Tell Next.js the data changed so it refetches
  revalidatePath("/chaos"); 
}