const fs = require('fs');
const path = require('path')
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const handlebars = require('handlebars');
const mime = require('./mime');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache');

const tplPath = path.join(__dirname , '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = handlebars.compile(source.toString())

module.exports = async function (req, res, filePath , config) {

    try{
        const stats = await stat(filePath);

        res.statusCode = 200;

        const dir = path.relative(config.root,filePath);

        if(stats.isFile()){

            const contentType = mime(filePath);
            res.setHeader('Content-Type',contentType);
            res.setHeader('Content-Todd','666');

            if(isFresh(stats , req , res)){
                res.statusCode = 304;
                res.end();
                return;
            }

            let rs;
            const {code,start,end} = range(stats.size,req,res);
            if(code === 200){
                rs = fs.createReadStream(filePath);
            }else{
                res.statusCode = 206;
                rs = fs.createReadStream(filePath,{start,end});
            }

            if(filePath.match(config.compress)){
                rs = compress(rs,req,res);
            }
            rs.pipe(res);
        }else{

            res.setHeader('Content-Type','text/html');

            const files = await readdir(filePath);

            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files: files.map(file => {
                    return {
                        file,
                        icon: mime(file)
                    }
                })
            };
            res.end(template(data));
        }
    } catch(ex){

        console.error(ex);

        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<h1>404</h1>');
        res.end('</html>');
    }
}


