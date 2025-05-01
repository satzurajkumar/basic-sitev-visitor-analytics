// pages/api/get-analytics.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getUniqueVisitorCount, getAllVisits } from "../../server/db"; // Import your simulated/actual db functions
import { VisitData } from "../../server/types";

export interface AnalyticsData {
	uniqueVisitorCount: number;
	totalVisits: number;
	recentVisits: VisitData[]; // Example: list of all visits for now
	// Add more fields as you implement more analytics
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AnalyticsData | { message: string }>
) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	try {
		const uniqueVisitorCount = await getUniqueVisitorCount();
		const allVisits = await getAllVisits(); // Get all visits for now

		const analyticsData: AnalyticsData = {
			uniqueVisitorCount,
			totalVisits: allVisits.length,
			recentVisits: allVisits.slice(0, 20), // Show up to 20 recent visits
			// Calculate and add more analytics here (e.g., visits per page, browser stats)
		};

		res.status(200).json(analyticsData);
	} catch (error) {
		console.error("Error in get-analytics API:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
