var jsOperador = {

	operadorAtual : {},

	abreOperadores : function() {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// troca o rodapé pra lista
		js.trocaRodape('lista');
		// busca e constrói as instalações
		jsOperador.buscaOperadores();
		// ajusta localização do header
		js.ajustaHeader();
		// troca o título da página
		js.trocaTitulo('operadores', 'definir');		
	},

	buscaOperadores : function() {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaOperadores"
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (operadores) {
				jsOperador.montaOperadores(operadores);
			}
		);
	},

	montaOperadores : function(operadores) {
		var operador = '';
		var div = '';
		for (var idx in operadores) {
			operador = operadores[idx];
			div = div + js.montaItemLista(operador.idoperador, 'jsOperador.clickOperador(this.id);', operador.nome);
		}
		div = div + '<div id="tela" name="listaOperadores"></div>';
		$("#conteudo").html(div);
	},	

	clickOperador : function(operador) {
		jsOperador.operadorAtual = operador;

		// verifica se está no modo gerente ou normal
		if (js.modoGerente()) {
			jsOperador.abreAlteraOperador();
		} else {
			jsOperador.abreDetalheOperador();
		}
	},	

	abreCadastroOperador : function() {
		js.abreTela('cadastroOperador.html');
		js.trocaTitulo('cadastro de operador', 'definir');
	},			

	abreAlteraOperador : function() {
		// troca o conteúdo da página
		jsOperador.abreCadastroOperador();
		// preenche os campos
		jsOperador.buscaUmOperador(jsOperador.operadorAtual);
	},	

	buscaUmOperador : function(idoperador) {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaUmOperador",
			"idoperador" : idoperador
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (operador) {
				js.preencheFormulario(operador);
				js.trocaRodape('cadastro');
			}
		);
	},

	novoOperador : function() {
		jsOperador.abreCadastroOperador();
	},

	salvaOperador : function() {
		var idoperador = $('#idoperador').val();
		var nome = $('#nome').val();
		var tipooperador = $('#tipooperador').val();

		// parâmetros para o backend
		var params = {
			"funcao" : "salvaOperador",
			"idoperador" : idoperador,
			"nome" : nome,
			"tipooperador" : tipooperador
		}

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function () {
				alert('Operador salvo com sucesso.');
				js.abreTelaAnterior();
			}
		);
	},

	loginOperador : function() {
		var idoperador = $('#idoperador').val();
		var senha = $('#senha').val();

		// parâmetros para o backend
		var params = {
			"funcao" : "loginOperador",
			"idoperador" : idoperador,
			"senha" : senha
		}

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (loginOk) {
				if (loginOk) {
					js.abreTelaInicial();
					js.login = {
						'idoperador' : idoperador
					};
				} else {
					alert('Usuário ou senha inválido.');
				}
			}
		);
	}

};