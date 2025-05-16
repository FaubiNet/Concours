const { verifyAdmin } = require('./admin-auth');
let downloadConfig = require('./download-config.json');

const getFileName = (url) => {
    const patterns = {
        'mediafire.com/file/': (u) => u.split('/file/')[1].split('/')[0],
        'drive.google.com': (u) => u.match(/\/d\/([^\/]+)/)?.[1] + '_GDrive',
        'default': () => 'download'
    };
    return Object.entries(patterns)
        .find(([key]) => url.includes(key))?.[1](url) || 'download';
};

exports.handler = async (event) => {
    if(!['GET', 'POST'].includes(event.httpMethod) && !verifyAdmin(event)) {
        return { statusCode: 401, body: 'Unauthorized' };
    }

    try {
        const body = event.body ? JSON.parse(event.body) : {};
        
        switch(event.httpMethod) {
            case 'GET':
                if(body.position && body.downloadKey) {
                    return {
                        statusCode: 200,
                        body: JSON.stringify({
                            url: downloadConfig[body.position]?.[body.downloadKey],
                            filename: getFileName(downloadConfig[body.position]?.[body.downloadKey])
                        })
                    };
                }
                return { statusCode: 200, body: JSON.stringify(downloadConfig) };

            case 'PUT':
                if(!verifyAdmin(event)) return { statusCode: 401 };
                downloadConfig = body;
                return { statusCode: 200, body: JSON.stringify(downloadConfig) };

            default:
                return { statusCode: 400, body: 'Méthode non supportée' };
        }
    } catch (error) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: error.message }) 
        };
    }
};