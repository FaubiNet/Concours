exports.verifyAdmin = (event) => {
    const authHeader = event.headers.authorization;
    return authHeader === process.env.ADMIN_TOKEN;
};