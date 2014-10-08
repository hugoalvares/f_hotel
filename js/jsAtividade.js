var jsAtividade = {

	atividadeAtual : {},

	abreAtividades : function() {
		window.location = 'atividades.html';
	},

	abreCadastroAtividade : function() {
		window.location = 'cadastroAtividade.html';
	},

	abreDetalheAtividade : function() {
		window.location = 'detalheAtividade.html';
	},

	buscaAtividades : function() {
		// parâmetros para o backend
		var params = {
			"funcao" : "getAtividades"
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
			div = div + '<div id="' + atividade.idatividade + '" onclick="jsAtividade.clickAtividade(this.id);">' + atividade.nome + '</div>'
		}
		$("#conteudo").html(div);
	},

	salvaAtividade : function() {
		var nome = $('#nome').val();
		var preco = $('#preco').val();
		var descicao = $('#descicao').val();

		// parâmetros para o backend
		var params = {
			"funcao" : "getAtividades",
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
			}
		);
	},	

	clickAtividade : function(atividade) {
		atividade.atividadeAtual = atividade;

		// verifica se está no modo gerente ou normal
		if (js.modoGerente()) {
			jsAtividade.abreCadastroAtividade();
		} else {
			jsAtividade.abreDetalheAtividade();
		}
	},

	preparaParaEdicao : function() {
		console.log(jsAtividade.atividadeAtual);
	},

	preparaParaDetalhe : function() {

	}

};