const getFileName = (url) => {
    const patterns = {
        'mediafire.com/file/': (u) => u.split('/file/')[1].split('/')[0],
        'drive.google.com': (u) => {
            const match = u.match(/\/d\/([^\/]+)/);
            return match ? match[1] + '_GDrive' : 'google_file';
        },
        'play.google.com': () => 'AI_Dating_App',
        'z-library.sk': () => 'Z-Library_Portal'
    };
    
    for (const [pattern, handler] of Object.entries(patterns)) {
        if (url.includes(pattern)) return handler(url);
    }
    return 'download';
};

exports.handler = async (event) => {
    const downloadMap = {
        1: {
            'ai-chat': 'https://reconpenses-notification.netlify.app/',
            'likes-vues': 'https://www.mediafire.com/folder/b2i98eypushsp/Like-Vues+Reseaux+sociaux',
            'hack-android': 'https://drive.google.com/file/d/1UXIauIgH_rrYMJIcdo1igOTZvioFhNCL/view?usp=drivesdk',
            'hack-whatsapp': 'https://www.mediafire.com/file/il64l4ov4oi1txf/WHATSAPP_HACK_NEW_METHOD.zip/file'
        },
        2: {
            'numeros-virtuels': 'https://reconpenses-notification.netlify.app/',
            'darkweb': 'https://www.mediafire.com/file/i4fadf53inb3244/DARK_WEBB.pdf/file',
            'hack-wifi': 'https://www.mediafire.com/file/ugi21782gmyla3g/Cours_complet_Hack_Wifi.rar/file'
        },
        3: {
            'business-afrique': 'https://www.mediafire.com/file/81n0o50kmeisdgs/500_IDEES_DE_BUSINESS_POUR_ENTREPRENDRE_PDF.pdf/file',
            'termux': 'https://www.mediafire.com/file/kzu37a2qqq1vqr1/termux.pdf/file',
            'ai-drague': 'https://reconpenses-notification.netlify.app/'
        },
        4: {
            'cours-dev': 'https://www.mediafire.com/file/4srrzwhehej12m0/Cours_Python-HTML-CSS-pdf.rar/file',
            'bibliotheque': 'https://reconpenses-notification.netlify.app/'
        }
    };

    try {
        const { position, downloadKey } = JSON.parse(event.body);
        const validatedPosition = parseInt(position);

        if (!downloadMap[validatedPosition]?.[downloadKey]) {
            return {
                statusCode: 404,
                headers: { 
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: "Ressource non trouvée" })
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                url: downloadMap[validatedPosition][downloadKey],
                filename: getFileName(downloadMap[validatedPosition][downloadKey])
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: "Erreur serveur" })
        };
    }
};