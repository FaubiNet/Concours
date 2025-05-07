exports.handler = async (event) => {
    const passwords = {
        1: "supreme123",
        2: "prohacker456", 
        3: "evolve789",
        4: "starter000"
    };

    try {
        const data = JSON.parse(event.body);
        const isCorrect = passwords[data.position] === data.password;
        
        return {
            statusCode: 200,
            body: JSON.stringify({ valid: isCorrect })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erreur de vérification" })
        };
    }
};