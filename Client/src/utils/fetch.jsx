import factorizedFetch from "./factorizedFetch";

//* ----- Review Fetch ----- *\\
// getReviewsByContentId
await factorizedFetch("GET", `review/${contentId}`, body)
// create review
await factorizedFetch("POST", `review/create`, body, true)

// delete review
await factorizedFetch("DELETE", `review/delete/${reviewId}`)

