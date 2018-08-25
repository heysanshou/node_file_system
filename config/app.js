const process = require('process');

module.exports = {
    hostname: '0.0.0.0',
    port:3333,
    root:process.cwd(),
    compress: /\.(html|js|css|md)/
};
