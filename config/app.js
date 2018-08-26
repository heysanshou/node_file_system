const process = require('process');

module.exports = {
    hostname: '0.0.0.0',
    port:3333,
    root:process.cwd(),
    compress: /\.(html|js|css|md)/,
    cache: {
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        ETag: true
    }
};
