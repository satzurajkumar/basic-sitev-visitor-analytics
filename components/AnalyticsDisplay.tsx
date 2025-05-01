// components/AnalyticsDisplay.tsx
import React from "react";
import { AnalyticsData } from "../pages/api/get-analytics"; // Import the type
import { VisitData } from "../server/types"; // Import the type

interface AnalyticsDisplayProps {
	data: AnalyticsData | null;
	loading: boolean;
	error: string | null;
}

const AnalyticsDisplay: React.FC<AnalyticsDisplayProps> = ({
	data,
	loading,
	error,
}) => {
	if (loading) {
		return <p>Loading analytics...</p>;
	}

	if (error) {
		return <p className="error">Error loading analytics: {error}</p>;
	}

	if (!data) {
		return null; // Or a message indicating no data
	}

	return (
		<div className="analytics-container">
			<h2>Site Analytics</h2>
			<p>
				Unique Visitors: <strong>{data.uniqueVisitorCount}</strong>
			</p>
			<p>
				Total Visits: <strong>{data.totalVisits}</strong>
			</p>

			<h3>Recent Visits</h3>
			{data.recentVisits.length === 0 ? (
				<p>No recent visits recorded yet.</p>
			) : (
				<ul>
					{data.recentVisits.map((visit, index) => (
						<li key={index}>
							Page: {visit.page}, Time:{" "}
							{new Date(visit.timestamp).toLocaleString()}, Browser:{" "}
							{visit.userAgent.split(" ")[0]}...
							{/* Basic parsing of User Agent - needs more robust handling */}
						</li>
					))}
				</ul>
			)}

			{/* Add more analytics displays here */}
		</div>
	);
};

export default AnalyticsDisplay;
