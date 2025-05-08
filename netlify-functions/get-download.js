exports.handler = async (event) => {
    const downloadMap = {
        1: {
            "apps-hacking": "https://www.mediafire.com/file/lz4u8np18fohlm5/Collection_Apps_Hacking.rar/file",
            "python-pdf": "https://www.mediafire.com/file/q2fxpyovzx95gav/Apprendre_Python.rar/file",
            "wifi-course": "https://www.mediafire.com/file/ugi21782gmyla3g/Cours_complet_Hack_Wifi.rar/file",
            "html-css": "https://www.mediafire.com/file/6q5voeb0055jnz2/Cours_HTML-CSS-pdf.rar/file",
            "ia-tips": "https://www.mediafire.com/file/18rqo306jnvbyd8/Astuces_IA_Cr%25C3%25A9ative.rar/file",
            "image-hack": "https://www.mediafire.com/file/fp958ec40ltoemh/Hack_Avec_Image.rar/file"
        },
        2: {
            "psycho-manip": "https://www.mediafire.com/file/5x6siw6mgg10efe/Psychologie_Manipulation.rar/file",
            "langages-pack": "https://www.mediafire.com/file/4srrzwhehej12m0/Cours_Python-HTML-CSS-pdf.rar/file",
            "avatars-ia": "https://www.mediafire.com/file/p5ghi0aqae0mvsh/Astuces_IA_Cr%25C3%25A9ative.rar/file"
        },
        3: {
            "html-css-docs": "https://www.mediafire.com/file/ljsk326dkwaimin/Cours_HTML-CSS-pdf.rar/file",
            "brute-force-list": "https://www.mediafire.com/file/b93bzheutlc3qtw/Liste_des_Mot_de_passe_Rockyou.rar/file",
            "android-root": "https://www.mediafire.com/file/3wgkemqwxz54a70/Hack_avec_Android_Root.rar/file"
        },
        4: {
            "terminal-apps": "https://www.mediafire.com/file/lz4u8np18fohlm5/Collection_Apps_Hacking.rar/file",
            "photoshop-guide": "https://www.mediafire.com/file/jj3ci628d7ll0uo/Photoshop_guide.rar/file",
            "wifi-debutant": "https://www.mediafire.com/file/j3kqo88z7nbbm9v/Hack_wifi_Pour_debutant.rar/file"
        }
    };

    try {
        const { position, downloadKey } = JSON.parse(event.body);
        const validatedPosition = parseInt(position);

        // Vérification spéciale pour le pack apps-hacking
        if (validatedPosition === 1 && downloadKey === 'apps-hacking') {
            return {
                statusCode: 423,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' 
                },
                body: JSON.stringify({ 
                    error: "📦 Félicitations ! Vous avez débloqué le pack complet 'Collection Apps Hacking'. Cependant, en raison de sa grande taille (beaucoup d'applications incluses), l'upload est toujours en cours. Nous finalisons le transfert pour que vous puissiez le télécharger en totalité. Merci de patienter environ 24h avant de réessayer. 🙏 Votre récompense arrive très bientôt, promis !"
                })
                
            };
        }

        // Vérification standard
        if (!downloadMap[validatedPosition]?.[downloadKey]) {
            return {
                statusCode: 403,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' 
                },
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
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' 
            },
            body: JSON.stringify({ error: "Erreur de serveur" })
        };
    }
};