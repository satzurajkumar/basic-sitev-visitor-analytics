// pages/_app.tsx (Example - runs on every page client-side mount)
import { useEffect } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css"; // Your global styles
import { getVisitorId } from "../utils/visitorUtils";

// Assume you have a helper to send data to your API
async function trackVisit(visitorId: string, path: string) {
	try {
		const response = await fetch("/api/track-visitor", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				visitorId: visitorId,
				page: path, // Or window.location.pathname
				timestamp: new Date().toISOString(),
				userAgent: navigator.userAgent, // Example of collecting other data
			}),
		});

		if (!response.ok) {
			console.error("Failed to track visit:", response.statusText);
		}
	} catch (error) {
		console.error("Error tracking visit:", error);
	}
}

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const visitorId = getVisitorId();
		trackVisit(visitorId, window.location.pathname);
		// We might only want to track the initial load,
		// or track route changes as well using next/router events.
		// For simplicity, this tracks initial mount per page.
	}, []); // Empty dependency array ensures this runs only once on mount

	return <Component {...pageProps} />;
}

export default MyApp;
