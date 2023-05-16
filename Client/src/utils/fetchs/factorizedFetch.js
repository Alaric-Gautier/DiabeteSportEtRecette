/**
 * Factorized function used to fetch the API. 
 * @param {String} method - Method of the fetch (GET, POST, PUT, DELETE)
 * @param {String} endpoint - Endpoint of the url
 * @param {Object} body - optional, body of the request
 * @param {Boolean} needAuth - Is the fetch need an authentication ? false by default.
 * @param {Object} headers 
 * @returns
 */
const factorizedFetch = async (method, endpoint, body = null, needAuth = false, headers={}) => {
    // construit l'url à partir de l'url de base + endpoint à spécifier (param inclus)
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
        return {responseData, status:response.status};

    } catch (error) {
        console.error(error);
    }
  };

  export default factorizedFetch;