"use client";

import { useEffect, useState } from "react";
import { getLogsAction, writeLogAction } from "@/actions/logger";

export default function ChaosLaboratory() {
	const [text, setText] = useState("");
	const [logs, setLogs] = useState<any[]>([]);

	// =====================================================================
	// EXPERIMENT A: THE NAKED SIDE EFFECT (The Disaster)
	// React has no control over this. The V8 engine will execute this
	// network request the millisecond this function hits the Call Stack.
	// =====================================================================
	writeLogAction("NAKED");

	// =====================================================================
	// EXPERIMENT B: THE QUARANTINED SIDE EFFECT (Safe)
	// React ignores this during the Render Phase. It only executes
	// AFTER the physical DOM is painted and the state is stable.
	// =====================================================================
	useEffect(() => {
		writeLogAction("QUARANTINED");
	}, []);

	// Fetch the data to prove what happened in the database
	useEffect(() => {
		console.log("Input changed to:", text);
		getLogsAction().then(setLogs);
	}, [text]); // Re-fetch when you type to see the live damage

	return (
		<div className="p-8 font-mono">
			<h1 className="text-2xl font-bold mb-4">V8 vs React Reconciler</h1>

			<div className="mb-8">
				<label
					htmlFor="chaos-input"
					className="block mb-2 text-red-500 font-bold"
				>
					Type here to trigger re-renders:
				</label>
				<input
					id="chaos-input"
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="border border-gray-500 p-2 text-black w-full"
					placeholder="Start typing..."
				/>
			</div>

			<h2 className="text-xl border-b pb-2 mb-4">Database Execution Ledger:</h2>
			<ul className="space-y-1">
				{logs.map((log) => (
					<li
						key={log.id}
						className={
							log.message.includes("NAKED") ? "text-red-500" : "text-green-500"
						}
					>
						[{new Date(log.createdAt).toLocaleTimeString()}] {log.message}
					</li>
				))}
			</ul>
		</div>
	);
}
