// pages/api/track-visitor.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { saveVisit } from "../../server/db"; // Import your simulated/actual db functions
import { VisitData } from "../../server/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	const { visitorId, page, timestamp, userAgent } = req.body as VisitData;

	if (!visitorId || !page || !timestamp || !userAgent) {
		return res.status(400).json({ message: "Missing required data" });
	}

	try {
		// Save the visit data using your database logic
		await saveVisit({ visitorId, page, timestamp, userAgent });
		res.status(200).json({ message: "Visit tracked successfully" });
	} catch (error) {
		console.error("Error in track-visitor API:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
