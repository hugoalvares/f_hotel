var jsInstalacao = {

	instalacaoAtual : {},

	abreInstalacoes : function() {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// busca e constrói as instalações
		jsInstalacao.buscaInstalacoes();
		// ajusta localização do header
		js.ajustaHeader();
		// troca o título da página
		js.trocaTitulo('instalações');		
	},

	buscaInstalacoes : function() {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaInstalacoes"
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (instalacoes) {
				jsInstalacao.montaInstalacoes(instalacoes);
			}
		);
	},

	montaInstalacoes : function(instalacoes) {
		var instalacao = '';
		var div = '';
		for (var idx in instalacoes) {
			instalacao = instalacoes[idx];
			div = div + '<div id="' + instalacao.idinstalacao + '" onclick="jsInstalacao.clickInstalacao(this.id);">' + instalacao.nome + '</div>';
		}
		div = div + '<div id="tela" name="listaInstalacoes"></div>';
		$("#conteudo").html(div);
	},	

	clickInstalacao : function(instalacao) {
		jsInstalacao.instalacaoAtual = instalacao;

		// verifica se está no modo gerente ou normal
		if (js.modoGerente()) {
			jsInstalacao.abreAlteraInstalacao();
		} else {
			jsInstalacao.abreDetalheInstalacao();
		}
	},	

	abreCadastroInstalacao : function() {
		js.abreTela('cadastroInstalacao.html');
		js.trocaTitulo('cadastro de instalação');
	},			

	abreAlteraInstalacao : function() {
		// troca o conteúdo da página
		jsInstalacao.abreCadastroInstalacao();
		// preenche os campos
		jsInstalacao.buscaUmaInstalacao(jsInstalacao.instalacaoAtual);
	},	

	buscaUmaInstalacao : function(idinstalacao) {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaUmaInstalacao",
			"idinstalacao" : idinstalacao
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (instalacao) {
				js.preencheFormulario(instalacao);
				js.trocaRodape('cadastro');
			}
		);
	},

	novaInstalacao : function() {
		jsInstalacao.abreCadastroInstalacao();
	},

	salvaInstalacao : function() {
		var idinstalacao = $('#idinstalacao').val();
		var nome = $('#nome').val();
		var descricao = $('#descricao').val();
		var horariofuncionamento = $('#horariofuncionamento').val();

		// parâmetros para o backend
		var params = {
			"funcao" : "salvaInstalacao",
			"idinstalacao" : idinstalacao,
			"nome" : nome,
			"descricao" : descricao,
			"horariofuncionamento" : horariofuncionamento
		}

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function () {
				alert('Instalação salva com sucesso.');
				js.abreTelaAnterior();
			}
		);
	}	

};