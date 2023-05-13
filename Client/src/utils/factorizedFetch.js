/**
 * Factorized function used to fetch the API. 
 * @param {String} url
 * @param {String} method
 * @param {Object} body
 * @param {Boolean} needAuth - Is the fetch need an authentication ? false by default.
 * @param {Object} headers 
 * @returns
 */
// V1
// export default factorizedFetch = async (url, method, body = null, needAuth = false, headers={}) => {

// V2
// export default factorizedFetch = async (method, endpoint, body = null, needAuth = false, param=null, headers={}) => {

//V3
export default factorizedFetch = async (method, endpoint, body = null, needAuth = false, headers={}) => {
    // V2 - construit l'url à partir de l'url de base + endpoint et param à spécifier en argument
    // const url = `${import.meta.env.VITE_API}/${endpoint}/${param}`

    // V3 - construit l'url à partir de l'url de base + endpoint à spécifier (param inclus)
    const url = `${import.meta.env.VITE_API}/${endpoint}`
    
    // Ajoute le Content-Type aux headers, s'il y en a
    headers["Content-Type"] = "application/json";

    // Défini les options du fetch, incluant le cookie d'authentification
    const options = {
      method: method,
      credentials: needAuth ? "same-site" : "omit",
      headers: headers,
      body: body ? JSON.stringify(body) : null
    };

    // Exécute le fetch et retourne les data ou une erreur
    try {
        const response = await fetch(url, options);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || "Une erreur s'est produite !");
        }
        return responseData;

    } catch (error) {
        console.error(error);
    }
  };
