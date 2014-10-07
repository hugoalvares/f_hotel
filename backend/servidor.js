// uses
var express = require('express')
  , cors = require('cors')
  , app = express()
  , mysql = require('mysql'); 

// banco
var connection = mysql.createConnection(
    {
    	host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'mydb',
    }
);

var rodaSelect = function(sql, callback) {
	connection.query(sql, function(err, rows, fields) {
	    if (err) throw err;
	 	callback(rows);
	});
}

// libera acesso para o localhost
app.use(cors());

// webservice
app.get('/', function(req, res, next){
	// busca atividades
	if (req.query.funcao == 'getAtividades') {
		rodaSelect('SELECT * FROM ATIVIDADE', function(atividades) {
			res.send(atividades);
		});	
	}

	// busca instalações
	if (req.query.funcao == 'getInstalacoes') {
		rodaSelect('SELECT * FROM INSTALACAO', function(instalacoes) {
			res.send(instalacoes);
		});	
	}

	// busca hóspedes
	if (req.query.funcao == 'getHospedes') {
		rodaSelect('SELECT * FROM HOSPEDE', function(hospedes) {
			res.send(hospedes);
		});	
	}
});

// iniciando o servidor
app.listen(9090, function(){
	console.log('webservice rodando na porta 9090');
});
