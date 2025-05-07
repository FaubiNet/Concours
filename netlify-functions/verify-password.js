exports.handler = async (event) => {
    const passwords = {
        1: "kingsupreme123",
        2: "prohacker456", 
        3: "evolve789",
        4: "starter000"
    };

    try {
        const { position, downloadKey } = JSON.parse(event.body);
        const validatedPosition = parseInt(position);

        // Blocage uniquement pour apps-hacking du 1er gagnant
        if (validatedPosition === 1 && downloadKey === 'apps-hacking') {
            return {
                statusCode: 423,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    error: "Le pack est toujours en cours d'upload - Réessayez dans 24h" 
                })
            };
        }

        // Vérification standard pour les autres cas
        if (!downloadMap[validatedPosition] || !downloadMap[validatedPosition][downloadKey]) {
            return {
                statusCode: 403,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: "Accès non autorisé" })
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                url: downloadMap[validatedPosition][downloadKey] 
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erreur de serveur" })
        };
    }
};