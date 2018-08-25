const path = require('path');

const mimeTypes = {
    'xml': 'text/xml',
    'css': 'text/css',
    'html': 'text/html',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg',
    'png': 'image/png',
    'txt': 'text/plain',
};

module.exports = (filePath) => {
    let ext = path.extname(filePath).split('.').pop().toLowerCase();

    if(!ext){
        ext = filePath;
    }

    return mimeTypes[ext] || 'text/plain';
};
