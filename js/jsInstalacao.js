var jsInstalacao = {

	instalacaoAtual : {},

	abreInstalacoes : function() {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// troca o rodapé pra lista
		js.trocaRodape('lista');
		// busca e constrói as instalações
		jsInstalacao.buscaInstalacoes();
		// ajusta localização do header
		js.ajustaHeader();
		// troca o título da página
		js.trocaTitulo('instalações', 'iinst');		
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
			div = div + js.montaItemLista(instalacao.idinstalacao, 'jsInstalacao.clickInstalacao(this.id);', instalacao.nome, 'instalacao');
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
			jsInstalacao.abreDetalheInstalacao(instalacao);
		}
	},	

	abreCadastroInstalacao : function() {
		js.abreTela('cadastroInstalacao.html');
		js.trocaTitulo('cadastro de instalação', 'iinst');
	},			

	abreAlteraInstalacao : function() {
		// troca o conteúdo da página
		jsInstalacao.abreCadastroInstalacao();
		// preenche os campos
		jsInstalacao.buscaUmaInstalacao(jsInstalacao.instalacaoAtual, function(instalacao) {
			js.preencheFormulario(instalacao);
			js.trocaRodape('cadastro');
		});
	},	

	abreDetalheInstalacao : function(idinstalacao) {
		jsInstalacao.buscaUmaInstalacao(idinstalacao, function(instalacao) {
			// tela, título, ícone, footer
			js.trocaTela('detalheInstalacao.html', instalacao.nome, 'iinst', 'footerVoltar');
			setTimeout(function(){
				js.preencheDetalhe(instalacao);
			}, 100);
		});		
	},	

	buscaUmaInstalacao : function(idinstalacao, callback) {
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
				callback(instalacao);
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