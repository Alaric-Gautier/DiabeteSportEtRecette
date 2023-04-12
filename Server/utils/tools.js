const createError = (name, message = "", data = null) => {
    const error = new Error(message);
    error.name = name;
    error.data = data;
    throw error;
};

module.exports = { createError };
