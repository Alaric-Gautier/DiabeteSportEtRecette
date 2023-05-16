import factorizedFetch from "./factorizedFetch";

//* ----- MODERATION FETCH ----- *\\
// validation
export const validateContent = async (contentType, contentId) => {
    await factorizedFetch("/POST",`moderation/validation/${contentType}/${contentId}`,null,true)

}

// rejection
export const rejectContent = async (contentType,contentId) => {
    await factorizedFetch("/POST",`moderation/rejection/${contentType}/${contentId}`,null,true)
}