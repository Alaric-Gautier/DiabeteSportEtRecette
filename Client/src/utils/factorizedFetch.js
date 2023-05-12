/**
 * Factorized function used to fetch the API. 
 * @param {String} url
 * @param {String} method
 * @param {Object} body
 * @param {Boolean} needAuth - Is the fetch need an authentication ? false by default.
 * @param {Object} headers 
 * @returns
 */
// export default factorizedFetch = async (url, method, body = null, needAuth = false, headers={}) => {
export default factorizedFetch = async (endpoint, method, body = null, needAuth = false, headers={}) => {
    // construit l'url à partir de l'url de base + endpoint à spécifier
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
