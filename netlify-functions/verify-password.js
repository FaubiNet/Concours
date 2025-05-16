const fs = require('fs');
const path = require('path');
const { verifyAdmin } = require('./admin-auth');
let winners = require('./winners-data.json');

function saveWinners() {
    const filePath = path.join(__dirname, 'winners-data.json');
    fs.writeFileSync(filePath, JSON.stringify(winners, null, 2));
}

const passwords = {
    1: "rootAccess2025",
    2: "darkModeHacker",
    3: "binaryBeast321",
    4: "cyberStarterX"
};

exports.handler = async (event) => {

    // Vérification admin pour les méthodes non-GET
 // Au début du handler
if (event.httpMethod !== 'GET' && !verifyAdmin(event)) {
    return { statusCode: 401, body: JSON.stringify({ error: "Accès non autorisé" }) };
}

    try {
        const data = event.body ? JSON.parse(event.body) : {};

        // Gestion login admin en premier
        if (data.admin) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    valid: data.password === process.env.ADMIN_PASSWORD
                })
            };
        }

        // Vérification mot de passe pour les autres opérations
        if (event.httpMethod !== 'GET') {
            if (data.password !== process.env.ADMIN_PASSWORD) {
                return { statusCode: 401, body: JSON.stringify({ error: "Accès non autorisé" }) };
            }
        }

     


        // Opérations CRUD
        switch(event.httpMethod) {
        case 'GET':
            return { 
                statusCode: 200, 
                body: JSON.stringify(winners) 
            };

        // Modifier le handler PUT pour fusionner les données existantes
case 'PUT':
    const existingData = winners[data.position] || {};
    winners[data.position] = { ...existingData, ...data };
    saveWinners();
    return {
        statusCode: 200,
        body: JSON.stringify(winners),
        headers: { 'Content-Type': 'application/json' }
    };

        case 'DELETE':
            delete winners[data.position];
            saveWinners(); // Ajouter cette ligne
            return { 
                statusCode: 200, 
                body: JSON.stringify(winners) 
            };

            default: // Vérification mot de passe normal
                const isValid = passwords[data.position] === data.password;
                return {
                    statusCode: 200,
                    body: JSON.stringify({ 
                        valid: isValid,
                        position: data.position
                    })
                };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};