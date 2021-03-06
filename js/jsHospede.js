var jsHospede = {

	hospedeAtual : {},

	abreHospedes : function() {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// troca o rodapé pra lista
		js.trocaRodape('lista');
		// busca e constrói as instalações
		jsHospede.buscaHospedes();
		// ajusta localização do header
		js.ajustaHeader();
		// troca o título da página
		js.trocaTitulo('hóspedes', 'ihosp');		
	},

	buscaHospedes : function() {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaHospedes"
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (hospedes) {
				jsHospede.montaHospedes(hospedes);
			}
		);
	},

	montaHospedes : function(hospedes) {
		var hospede = '';
		var div = '';
		for (var idx in hospedes) {
			hospede = hospedes[idx];
			div = div + js.montaItemLista(hospede.idhospede, 'jsHospede.clickHospede(this.id);', hospede.nome, 'hospede');
		}
		div = div + '<div id="tela" name="listaHospedes"></div>';
		$("#conteudo").html(div);
	},	

	clickHospede : function(hospede) {
		jsHospede.hospedeAtual = hospede;

		// verifica se está no modo gerente ou normal
		if (js.modoGerente()) {
			jsHospede.abreAlteraHospede();
		} else {
			jsHospede.abreDetalheInstalacao();
		}
	},	

	abreCadastroHospede : function() {
		js.abreTela('cadastroHospede.html');
		js.trocaTitulo('cadastro de hóspede', 'ihosp');
	},				

	abreAlteraHospede : function() {
		// troca o conteúdo da página
		jsHospede.abreCadastroHospede();
		// preenche os campos
		jsHospede.buscaUmHospede(jsHospede.hospedeAtual);
	},	

	buscaUmHospede : function(idhospede) {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaUmHospede",
			"idhospede" : idhospede
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (hospede) {
				js.preencheFormulario(hospede);
				js.trocaRodape('cadastro');
			}
		);
	},

	novoHospede : function() {
		jsHospede.abreCadastroHospede();
	},

	salvaHospede : function() {
		var idhospede = $('#idhospede').val();
		var nome = $('#nome').val();
		var quarto = $('#quarto').val();
		var senha = $('#senha').val();

		// parâmetros para o backend
		var params = {
			"funcao" : "salvaHospede",
			"idhospede" : idhospede,
			"nome" : nome,
			"quarto" : quarto,
			"senha" : senha
		}

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function () {
				alert('Hóspede salvo com sucesso.');
				js.abreTelaAnterior();
			}
		);
	},

	loginHospede : function() {
		var idhospede = $('#idhospede').val();
		var senha = $('#senha').val();

		// parâmetros para o backend
		var params = {
			"funcao" : "loginHospede",
			"idhospede" : idhospede,
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
						'idhospede' : idhospede
					};
				} else {
					alert('Usuário ou senha inválido.');
				}
			}
		);
	}

};