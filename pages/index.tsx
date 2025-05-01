// pages/index.tsx
import Head from "next/head";
import { useEffect, useState } from "react";
import AnalyticsDisplay from "../components/AnalyticsDisplay";
import { AnalyticsData } from "./api/get-analytics"; // Import the type
import styles from "../styles/Home.module.css"; // Example CSS Module

export default function Home() {
	const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchAnalytics() {
			try {
				setLoading(true);
				const response = await fetch("/api/get-analytics");
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				const data: AnalyticsData = await response.json();
				setAnalyticsData(data);
			} catch (err: any) {
				setError(err.message);
				console.error("Failed to fetch analytics:", err);
			} finally {
				setLoading(false);
			}
		}

		fetchAnalytics();

		// Optional: Fetch analytics periodically to keep it updated
		// const intervalId = setInterval(fetchAnalytics, 30000); // Fetch every 30 seconds
		// return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, []); // Empty dependency array means this runs once on mount

	return (
		<div className={styles.container}>
			<Head>
				<title>My Analytics Site</title>
				<meta name="description" content="Simple site analytics" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to the Analytics Demo</h1>

				<p className={styles.description}>
					This page tracks visitors and displays basic analytics.
				</p>

				<AnalyticsDisplay
					data={analyticsData}
					loading={loading}
					error={error}
				/>

				{/* You can add your site content here */}
			</main>

			<footer className={styles.footer}>Powered by Next.js</footer>
		</div>
	);
}
