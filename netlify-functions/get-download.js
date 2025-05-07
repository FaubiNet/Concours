exports.handler = async (event) => {
    const downloadMap = {
        1: {
            "apps-hacking": "https://votre-lien-secret.com/apps-hacking.zip",
            "python-pdf": "https://votre-lien-secret.com/python.pdf",
            "wifi-course": "https://votre-lien-secret.com/wifi-course.pdf",
            "html-css": "https://votre-lien-secret.com/html-css.pdf",
            "ia-tips": "https://votre-lien-secret.com/ia-tips.pdf"
        },
        2: {
            "psycho-manip": "https://votre-lien-secret.com/psycho-manip.pdf",
            "langages-pack": "https://votre-lien-secret.com/langages-pack.zip",
            "avatars-ia": "https://votre-lien-secret.com/avatars-ia.pdf"
        },
        3: {
            "html-css-docs": "https://votre-lien-secret.com/html-css-docs.pdf",
            "brute-force-list": "https://votre-lien-secret.com/brute-force-list.txt",
            "android-root": "https://votre-lien-secret.com/android-root.pdf"
        },
        4: {
            "terminal-apps": "https://votre-lien-secret.com/terminal-apps.zip",
            "photoshop-guide": "https://votre-lien-secret.com/photoshop-guide.pdf",
            "wifi-debutant": "https://votre-lien-secret.com/wifi-debutant.pdf"
        }
    };

    try {
        const { position, downloadKey } = JSON.parse(event.body);
        const validatedPosition = parseInt(position);
        
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