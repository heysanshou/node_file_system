const http = require('http');
const chalk = require('chalk');
const conf = require('./config/app');
const path = require('path');
const route = require('./helper/route');

class Server {

    constructor (config) {
        this.conf = Object.assign({} , conf , config);
    }

    start(){

        const server = http.createServer((req,res) => {

            const filePath = path.join(this.conf.root,req.url);

            // console.log(chalk.red(filePath));

            route(req , res , filePath , this.conf);
        });

        server.listen(this.conf.port , this.conf.hostname, () => {
            const str = `server runing @ ${this.conf.hostname}:${this.conf.port}`;
            console.log(chalk.green(str));
        });
    }
}

module.exports = Server;
