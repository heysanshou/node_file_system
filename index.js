const http = require('http');
const chalk = require('chalk');
const conf = require('./config/app');
const path = require('path');
const route = require('./helper/route');

const hostname = conf.hostname;
const port = conf.port;

const server = http.createServer((req,res) => {
    const filePath = path.join(__dirname,req.url);
    console.log(chalk.red(filePath));

    console.log(chalk.green(conf.root));

    route(req,res,filePath);
});

server.listen(port , hostname, () => {
    const str = 'server runing!';
    console.log(chalk.green(str));
});
