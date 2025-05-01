// server/types.ts
export interface VisitData {
	visitorId: string;
	page: string;
	timestamp: string; // ISO string
	userAgent: string;
}

export interface VisitorData {
	id: string;
	firstVisit: string; // ISO string
	lastVisit: string; // ISO string
	visits: VisitData[];
}

// server/db.ts (Simulated in-memory storage - NOT FOR PRODUCTION)
// In a real app, this would be database interactions
let visitors: { [key: string]: VisitorData } = {}; // Map visitorId to VisitorData

export async function saveVisit(visit: VisitData): Promise<void> {
	console.log("Saving visit:", visit);
	if (!visitors[visit.visitorId]) {
		visitors[visit.visitorId] = {
			id: visit.visitorId,
			firstVisit: visit.timestamp,
			lastVisit: visit.timestamp,
			visits: [],
		};
	}

	visitors[visit.visitorId].lastVisit = visit.timestamp;
	visitors[visit.visitorId].visits.push(visit);

	console.log("Current unique visitors count:", Object.keys(visitors).length);

	// In a real app, you'd insert into a database here
	// Example with SQLite:
	// db.run("INSERT INTO visits (visitorId, page, timestamp, userAgent) VALUES (?, ?, ?, ?)", [visit.visitorId, visit.page, visit.timestamp, visit.userAgent]);
}

export async function getUniqueVisitorCount(): Promise<number> {
	// In a real app: SELECT COUNT(DISTINCT visitorId) FROM visits;
	return Object.keys(visitors).length;
}

export async function getAllVisits(): Promise<VisitData[]> {
	// In a real app: SELECT * FROM visits ORDER BY timestamp DESC;
	const allVisits: VisitData[] = [];
	for (const visitorId in visitors) {
		allVisits.push(...visitors[visitorId].visits);
	}
	// Sort by timestamp just for better display
	allVisits.sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
	);
	return allVisits;
}

// Add other functions as needed, e.g., getVisitsByVisitorId, getVisitsByPage etc.
