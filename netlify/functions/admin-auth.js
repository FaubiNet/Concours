exports.verifyAdmin = (event) => {
    const authHeader = event.headers.authorization;
    console.log('Received auth header:', authHeader); // Debug
    return authHeader === process.env.ADMIN_TOKEN;
};