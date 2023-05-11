const register = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_API}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
};
