exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const passwords = {
        1: "supreme123",
        2: "prohacker456", 
        3: "evolve789",
        4: "starter000"
    };

    try {
        const data = JSON.parse(event.body);
        console.log('Parsed data:', data);
        const isCorrect = passwords[data.position] === data.password;
        
       return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ valid: isCorrect })
};
   } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};