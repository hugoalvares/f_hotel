var jsServico = {

	servicoAtual : {},

	abreServicos : function() {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// troca o rodapé pra lista
		js.trocaRodape('lista');
		// busca e constrói as instalações
		jsServico.buscaServicos();
		// ajusta localização do header
		js.ajustaHeader();
		// troca o título da página
		js.trocaTitulo('serviços', 'iserv');		
	},

	buscaServicos : function() {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaServicos"
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (servicos) {
				jsServico.montaServicos(servicos);
			}
		);
	},

	montaServicos : function(servicos) {
		var servico = '';
		var div = '';
		for (var idx in servicos) {
			servico = servicos[idx];
			div = div + js.montaItemLista(servico.idservico, 'jsServico.clickServico(this.id);', servico.nome);
		}
		div = div + '<div id="tela" name="listaServicos"></div>';
		$("#conteudo").html(div);
	},	

	clickServico : function(servico) {
		jsServico.servicoAtual = servico;

		// verifica se está no modo gerente ou normal
		if (js.modoGerente()) {
			jsServico.abreAlteraServico();
		} else {
			jsServico.abreDetalheServico(servico);
		}
	},	

	abreCadastroServico : function() {
		js.abreTela('cadastroServico.html');
		js.trocaTitulo('cadastro de serviço', 'iserv');
	},

	abreAlteraServico : function() {
		// troca o conteúdo da página
		jsServico.abreCadastroServico();
		// preenche os campos
		jsServico.buscaUmServico(jsServico.servicoAtual, function(servico){
			js.preencheFormulario(servico);
			js.trocaRodape('cadastro');
		});
	},	

	abreDetalheServico : function(idservico) {
		jsServico.buscaUmServico(idservico, function(servico) {
			// tela, título, ícone, footer
			js.trocaTela('detalheServico.html', servico.nome, 'iserv', 'servico');
			setTimeout(function(){
				js.preencheDetalhe(servico);
			}, 100);
		});		
	},

	buscaUmServico : function(idservico, callback) {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaUmServico",
			"idservico" : idservico
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (servico) {
				callback(servico);
			}
		);
	},

	novoServico : function() {
		jsServico.abreCadastroServico();
	},

	salvaServico : function() {
		var idservico = $('#idservico').val();
		var nome = $('#nome').val();
		var preco = $('#preco').val();
		var utilizaquantidade = $('#utilizaquantidade').val();
		var descricao = $('#descricao').val();

		// parâmetros para o backend
		var params = {
			"funcao" : "salvaServico",
			"idservico" : idservico,
			"nome" : nome,
			"preco" : preco,
			"utilizaquantidade" : utilizaquantidade,
			"descricao" : descricao
		}

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function () {
				alert('Serviço salvo com sucesso.');
				js.abreTelaAnterior();
			}
		);
	},

	solicitaServico : function() {
		var idservico = $('#idservico').html();
		var quantidade = $('#quantidade').val();
		var idhospede = js.login.idhospede;

		// parâmetros para o backend
		var params = {
			"funcao" : "solicitaServico",
			"idservico" : idservico,
			"idhospede" : idhospede,
			"quantidade" : quantidade
		}

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function () {
				alert('Serviço solicitado com sucesso.');
				js.abreTelaAnterior();
			}
		);	
	}

};