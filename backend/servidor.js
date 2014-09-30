// uses
var express = require('express')
  , cors = require('cors')
  , app = express()
  , mysql = require('mysql')
  , connection  = require('express-myconnection'); 

// banco
app.use(    
    connection(mysql, {
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306,
        database:'hotel'
    }, 'request')
);

// libera acesso para o localhost
app.use(cors());

// webservice padrão
app.get('/', function(req, res, next){
	res.json({msg: 'teste'});
});

// iniciando o servidor
app.listen(9090, function(){
	console.log('CORS-enabled web server listening on port 9090');
});