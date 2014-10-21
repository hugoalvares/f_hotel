var jsAtividade = {

	atividadeAtual : {},

	abreAtividades : function() {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// troca o rodapé pra lista
		js.trocaRodape('lista');
		// busca e constrói as atividades
		jsAtividade.buscaAtividades();
		// ajusta localização do header
		js.ajustaHeader();
		// troca o título da página
		js.trocaTitulo('atividades', 'iativ');
	},

	buscaAtividades : function() {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaAtividades"
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (atividades) {
				jsAtividade.montaAtividades(atividades);
			}
		);
	},	

	montaAtividades : function(atividades) {
		var atividade = '';
		var div = '';
		for (var idx in atividades) {
			atividade = atividades[idx];
			div = div + js.montaItemLista(atividade.idatividade, 'jsAtividade.clickAtividade(this.id);', atividade.nome);
		}
		div = div + '<div id="tela" name="listaAtividades"></div>';
		$("#conteudo").html(div);
	},	

	clickAtividade : function(atividade) {
		jsAtividade.atividadeAtual = atividade;

		// verifica se está no modo gerente ou normal
		if (js.modoGerente()) {
			jsAtividade.abreAlteraAtividade();
		} else {
			jsAtividade.abreDetalheAtividade();
		}
	},	

	abreCadastroAtividade : function() {
		js.abreTela('cadastroAtividade.html');
		js.trocaTitulo('cadastro de atividade', 'iativ');
	},			

	abreAlteraAtividade : function() {
		// troca o conteúdo da página
		jsAtividade.abreCadastroAtividade();
		// preenche os campos
		jsAtividade.buscaUmaAtividade(jsAtividade.atividadeAtual);
	},

	buscaUmaAtividade : function(idatividade) {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaUmaAtividade",
			"idatividade" : idatividade
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (atividade) {
				js.preencheFormulario(atividade);
				js.trocaRodape('cadastro');
			}
		);
	},	

	novaAtividade : function() {
		jsAtividade.abreCadastroAtividade();
	},

	salvaAtividade : function() {
		var idatividade = $('#idatividade').val();
		var nome = $('#nome').val();
		var preco = $('#preco').val();
		var descricao = $('#descricao').val();

		// parâmetros para o backend
		var params = {
			"funcao" : "salvaAtividade",
			"idatividade" : idatividade,
			"nome" : nome,
			"preco" : preco,
			"descricao" : descricao
		}

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function () {
				alert('Atividade salva com sucesso.');
				js.abreTelaAnterior();
			}
		);
	}

};