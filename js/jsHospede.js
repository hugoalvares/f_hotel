var jsHospede = {

	hospedeAtual : {},

	abreHospedes : function() {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// busca e constrói as instalações
		jsHospede.buscaHospedes();
		// ajusta localização do header
		js.ajustaHeader();
		// troca o título da página
		js.trocaTitulo('hóspedes');		
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
			div = div + '<div id="' + hospede.idhospede + '" onclick="jsHospede.clickHospede(this.id);">' + hospede.nome + '</div>';
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
		js.trocaTitulo('cadastro de hóspede');
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

		// parâmetros para o backend
		var params = {
			"funcao" : "salvaHospede",
			"idhospede" : idhospede,
			"nome" : nome,
			"quarto" : quarto
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
	}	

};