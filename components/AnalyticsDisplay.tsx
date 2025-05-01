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
			<h3>Recent Visits ({data.recentVisits.length} shown)</h3>{" "}
			{/* Indicate number shown */}
			{data.recentVisits.length === 0 ? (
				<p>No recent visits recorded yet.</p>
			) : (
				<ul>
					{data.recentVisits.map((visit, index) => (
						// Updated structure for better readability
						<li key={index} className="visit-item">
							{" "}
							{/* Added a class for potential specific styling */}
							<p>
								<strong>Page:</strong> {visit.page}
							</p>
							<p>
								<strong>Time:</strong>{" "}
								{new Date(visit.timestamp).toLocaleDateString()} -{" "}
								{new Date(visit.timestamp).toLocaleTimeString()}
							</p>
							<p>
								<strong>Browser Info:</strong> {visit.userAgent}{" "}
								{/* Displaying full for detail, consider truncating */}
							</p>
							{/* Optional: Truncated Browser Info */}
							{/* <p>
                <strong>Browser (partial):</strong> {visit.userAgent.split(' ')[0]}...
              </p> */}
						</li>
					))}
				</ul>
			)}
			{/* Add more analytics displays here */}
		</div>
	);
};

export default AnalyticsDisplay;
