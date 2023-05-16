import factorizedFetch from "./factorizedFetch";

//* ----- Review Fetch ----- *\\
// getReviewsByContentId
export const getReviewsByContentId = async (contentId, body) => {
    await factorizedFetch("GET", `review/${contentId}`, body)
}

// create review
export const createReview = async (body) => {
    await factorizedFetch("POST", `review/create`, body, true)
}

// delete review
export const deleteReview = async (reviewId) => {
    await factorizedFetch("DELETE", `review/delete/${reviewId}`)
}