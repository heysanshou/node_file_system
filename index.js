const yargs = require('yargs');
const Server = require('./boot');

const argv = yargs.usage('anwhere [options]')
    .option('p',{
        alias: 'port',
        describe: '端口号',
        default: 3333
    }).option('h',{
        alias: 'hostname',
        describe: '主机名',
        default: '0.0.0.0'
    }).option('d',{
        alias: 'root',
        describe: '根目录',
        default: process.cwd()
    })
    .version()
    .alias('v','version')
    .help()
    .argv;


const server = new Server(argv);
server.start();
