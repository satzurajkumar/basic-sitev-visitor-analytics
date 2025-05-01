// utils/visitorUtils.ts
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

const VISITOR_ID_COOKIE_NAME = "visitorId";
const COOKIE_EXPIRY_DAYS = 365; // Store the ID for 1 year

export function getVisitorId(): string {
	let visitorId = Cookies.get(VISITOR_ID_COOKIE_NAME);

	if (!visitorId) {
		// If no visitor ID found, generate a new one
		visitorId = uuidv4();
		// Set the cookie with an expiry
		Cookies.set(VISITOR_ID_COOKIE_NAME, visitorId, {
			expires: COOKIE_EXPIRY_DAYS,
		});
	}

	return visitorId;
}

// Optional: You might need this if you were setting the ID server-side initially
// export function setVisitorId(id: string): void {
//   Cookies.set(VISITOR_ID_COOKIE_NAME, id, { expires: COOKIE_EXPIRY_DAYS });
// }
