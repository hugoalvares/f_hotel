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

var rodaSql = function(sql, callback) {
	connection.query(sql, function(err, rows, fields) {
	    if (err) throw err;
	 	callback(rows);
	});
}

// libera acesso para o localhost
app.use(cors());

// webservice
app.get('/', function(req, res, next){

	// ------------------------------------ ATIVIDADES --------------------------------
	// busca todas as atividades
	if (req.query.funcao == 'buscaAtividades') {
		rodaSql('SELECT * FROM ATIVIDADE', function(atividades) {
			res.send(atividades);
		});	
	}

	// busca uma atividade específica
	if (req.query.funcao == 'buscaUmaAtividade') {
		var sql = 'SELECT * FROM ATIVIDADE WHERE IDATIVIDADE = ' + req.query.idatividade;
		rodaSql(sql, function(atividade) {
			res.send(atividade[0]);
		});	
	}

	// salva uma atividade
	if (req.query.funcao == 'salvaAtividade') {
		var sql;
		if (req.query.idatividade) { // registro existente
			sql = 'UPDATE ATIVIDADE SET NOME = "' + req.query.nome + '", PRECO = "' + req.query.preco + '", DESCRICAO = "' + req.query.descricao + '" WHERE IDATIVIDADE = "' + req.query.idatividade + '"';
		} else { // novo registro
			sql = 'INSERT INTO ATIVIDADE (NOME, PRECO, DESCRICAO) VALUES ("' + req.query.nome + '", "' + req.query.preco + '", "' + req.query.descricao + '")';
		}
		rodaSql(sql, function() {
			res.send({});
		});	
	}
	// --------------------------------------------------------------------------------


	// ------------------------------------ INSTALAÇÕES -------------------------------
	// busca todas as instalações
	if (req.query.funcao == 'buscaInstalacoes') {
		rodaSql('SELECT * FROM INSTALACAO', function(instalacoes) {
			res.send(instalacoes);
		});	
	}

	// busca uma instalação específica
	if (req.query.funcao == 'buscaUmaInstalacao') {
		var sql = 'SELECT * FROM INSTALACAO WHERE IDINSTALACAO = ' + req.query.idinstalacao;
		rodaSql(sql, function(instalacao) {
			res.send(instalacao[0]);
		});	
	}	

	// salva uma instalação
	if (req.query.funcao == 'salvaInstalacao') {
		var sql;
		if (req.query.idinstalacao) { // registro existente
			sql = 'UPDATE INSTALACAO SET NOME = "' + req.query.nome + '", DESCRICAO = "' + req.query.descricao + '", HORARIOFUNCIONAMENTO = "' + req.query.horariofuncionamento + '" WHERE IDINSTALACAO = "' + req.query.idinstalacao + '"';
		} else { // novo registro
			sql = 'INSERT INTO INSTALACAO (NOME, DESCRICAO, HORARIOFUNCIONAMENTO) VALUES ("' + req.query.nome + '", "' + req.query.descricao + '", "' + req.query.horariofuncionamento + '")';
		}
		rodaSql(sql, function() {
			res.send({});
		});	
	}	
	// --------------------------------------------------------------------------------

	// ------------------------------------ SERVIÇOS ----------------------------------
	// busca todos os serviços
	if (req.query.funcao == 'buscaServicos') {
		rodaSql('SELECT * FROM SERVICO', function(servicos) {
			res.send(servicos);
		});	
	}

	// busca um serviço específico
	if (req.query.funcao == 'buscaUmServico') {
		var sql = 'SELECT * FROM SERVICO WHERE IDSERVICO = ' + req.query.idservico;
		rodaSql(sql, function(servico) {
			res.send(servico[0]);
		});	
	}

	// salva um serviço
	if (req.query.funcao == 'salvaServico') {
		var sql;
		if (req.query.idservico) { // registro existente
			sql = 'UPDATE SERVICO SET NOME = "' + req.query.nome + '", PRECO = "' + req.query.preco + '", UTILIZAQUANTIDADE = "' + req.query.utilizaquantidade + '", DESCRICAO = "' + req.query.descricao + '" WHERE IDSERVICO = "' + req.query.idservico + '"';
		} else { // novo registro
			sql = 'INSERT INTO SERVICO (NOME, PRECO, UTILIZAQUANTIDADE, DESCRICAO) VALUES ("' + req.query.nome + '", "' + req.query.preco + '", "' + req.query.utilizaquantidade + '", "' + req.query.descricao + '")';
		}
		rodaSql(sql, function() {
			res.send({});
		});	
	}
	// --------------------------------------------------------------------------------

	// ------------------------------------ HÓSPEDES ----------------------------------
	// busca todos os hóspedes
	if (req.query.funcao == 'buscaHospedes') {
		rodaSql('SELECT * FROM HOSPEDE', function(hospedes) {
			res.send(hospedes);
		});	
	}

	// busca um hóspede específico
	if (req.query.funcao == 'buscaUmHospede') {
		var sql = 'SELECT * FROM HOSPEDE WHERE IDHOSPEDE = ' + req.query.idhospede;
		rodaSql(sql, function(hospede) {
			res.send(hospede[0]);
		});	
	}

	// salva um hóspede
	if (req.query.funcao == 'salvaHospede') {
		var sql;
		if (req.query.idhospede) { // registro existente
			sql = 'UPDATE HOSPEDE SET NOME = "' + req.query.nome + '", QUARTO = "' + req.query.quarto + '", SENHA = "' + req.query.senha + '" WHERE IDHOSPEDE = "' + req.query.idhospede + '"';
		} else { // novo registro
			sql = 'INSERT INTO HOSPEDE (NOME, QUARTO, SENHA) VALUES ("' + req.query.nome + '", "' + req.query.quarto + '", "' + req.query.senha + '")';
		}
		rodaSql(sql, function() {
			res.send({});
		});	
	}

	// login do hóspede
	if (req.query.funcao == 'loginHospede') {
		var sql = 'SELECT SENHA FROM HOSPEDE WHERE IDHOSPEDE = ' + req.query.idhospede;
		rodaSql(sql, function(hospede) {
			var response = false;
			if (hospede.length > 0) {
				response = hospede[0]['SENHA'] === req.query.senha;
			}
			res.send(response);
		});	
	}	
	// --------------------------------------------------------------------------------	

	// ------------------------------------ OPERADORES --------------------------------
	// busca todos os operadores
	if (req.query.funcao == 'buscaOperadores') {
		rodaSql('SELECT * FROM OPERADOR', function(operadores) {
			res.send(operadores);
		});	
	}

	// busca um operador específico
	if (req.query.funcao == 'buscaUmOperador') {
		var sql = 'SELECT * FROM OPERADOR WHERE IDOPERADOR = ' + req.query.idoperador;
		rodaSql(sql, function(operador) {
			res.send(operador[0]);
		});	
	}

	// salva um operador
	if (req.query.funcao == 'salvaOperador') {
		var sql;
		if (req.query.idoperador) { // registro existente
			sql = 'UPDATE OPERADOR SET NOME = "' + req.query.nome + '", TIPOOPERADOR = "' + req.query.tipooperador + '", SENHA = "' + req.query.senha + '" WHERE IDOPERADOR = "' + req.query.idoperador + '"';
		} else { // novo registro
			sql = 'INSERT INTO OPERADOR (NOME, TIPOOPERADOR, SENHA) VALUES ("' + req.query.nome + '", "' + req.query.tipooperador + '", "' + req.query.senha + '")';
		}
		rodaSql(sql, function() {
			res.send({});
		});	
	}

	// login do operador
	if (req.query.funcao == 'loginOperador') {
		var sql = 'SELECT SENHA FROM OPERADOR WHERE IDOPERADOR = ' + req.query.idoperador;
		rodaSql(sql, function(operador) {
			var response = false;
			if (operador.length > 0) {
				response = operador[0]['SENHA'] === req.query.senha;
			}
			res.send(response);			
		});	
	}
	// --------------------------------------------------------------------------------		

	// ------------------------------------ PROFISSIONAIS -----------------------------
	// busca todos os profissionais
	if (req.query.funcao == 'buscaProfissionais') {
		rodaSql('SELECT * FROM PROFISSIONAL', function(profissionais) {
			res.send(profissionais);
		});	
	}

	// busca um profissional específico
	if (req.query.funcao == 'buscaUmProfissional') {
		var sql = 'SELECT * FROM PROFISSIONAL WHERE IDPROFISSIONAL = ' + req.query.idprofissional;
		rodaSql(sql, function(profissional) {
			res.send(profissional[0]);
		});	
	}

	// salva um profissional
	if (req.query.funcao == 'salvaProfissional') {
		var sql;
		if (req.query.idprofissional) { // registro existente
			sql = 'UPDATE PROFISSIONAL SET NOME = "' + req.query.nome + '" WHERE IDPROFISSIONAL = "' + req.query.idprofissional + '"';
		} else { // novo registro
			sql = 'INSERT INTO PROFISSIONAL (NOME) VALUES ("' + req.query.nome + '")';
		}
		rodaSql(sql, function() {
			res.send({});
		});	
	}
	// --------------------------------------------------------------------------------		

	// ------------------------------------ GRUPOS ------------------------------------
	// busca todos os grupos
	if (req.query.funcao == 'buscaGrupos') {
		rodaSql('SELECT * FROM GRUPO', function(grupos) {
			res.send(grupos);
		});	
	}

	// busca um grupo específico
	if (req.query.funcao == 'buscaUmGrupo') {
		var sql = 'SELECT * FROM GRUPO WHERE IDGRUPO = ' + req.query.idgrupo;
		rodaSql(sql, function(grupo) {
			res.send(grupo[0]);
		});	
	}

	// salva um grupo
	if (req.query.funcao == 'salvaGrupo') {
		var sql;
		if (req.query.idgrupo) { // registro existente
			sql = 'UPDATE GRUPO SET NOME = "' + req.query.nome + '" WHERE IDGRUPO = "' + req.query.idgrupo + '"';
		} else { // novo registro
			sql = 'INSERT INTO GRUPO (NOME) VALUES ("' + req.query.nome + '")';
		}
		rodaSql(sql, function() {
			res.send({});
		});	
	}
	// --------------------------------------------------------------------------------		

	// ------------------------------------ PRODUTOS ----------------------------------
	// busca todos os produtos
	if (req.query.funcao == 'buscaProdutos') {
		rodaSql('SELECT * FROM PRODUTO', function(produtos) {
			res.send(produtos);
		});	
	}

	// busca um produto específico
	if (req.query.funcao == 'buscaUmProduto') {
		var sql = 'SELECT * FROM PRODUTO WHERE IDPRODUTO = ' + req.query.idproduto;
		rodaSql(sql, function(produto) {
			res.send(produto[0]);
		});	
	}

	// salva um produto
	if (req.query.funcao == 'salvaProduto') {
		var sql;
		if (req.query.idproduto) { // registro existente
			sql = 'UPDATE PRODUTO SET NOME = "' + req.query.nome + '", PRECO = "' + req.query.preco + '", DESCRICAO = "' + req.query.descricao + '", GRUPO_IDGRUPO = "' + req.query.grupo_idgrupo + '" WHERE IDPRODUTO = "' + req.query.idproduto + '"';
		} else { // novo registro
			sql = 'INSERT INTO PRODUTO (NOME, PRECO, DESCRICAO, GRUPO_IDGRUPO) VALUES ("' + req.query.nome + '", "' + req.query.preco + '", "' + req.query.descricao + '", "' + req.query.grupo_idgrupo + '")';
		}
		rodaSql(sql, function() {
			res.send({});
		});	
	}
	// --------------------------------------------------------------------------------			

	// ------------------------------------ SOLICITAÇÕES ------------------------------
	// solicitação de serviço
	if (req.query.funcao == 'solicitaServico') {
		var sql = 'INSERT INTO ORDEMSERVICO (SERVICO_IDSERVICO, HOSPEDE_IDHOSPEDE, QUANTIDADE) VALUES ("' + req.query.idservico + '", "' + req.query.idhospede + '", "' + req.query.quantidade + '")';
		rodaSql(sql, function() {
			res.send({});
		});	
	}
	// --------------------------------------------------------------------------------			
});

// iniciando o servidor
app.listen(9090, function(){
	console.log('webservice rodando na porta 9090');
});
