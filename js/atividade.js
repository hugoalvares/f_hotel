var atividade = {

	atividadeAtual,

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
				atividade.montaAtividades(atividades);
			}
		);
	},

	montaAtividades : function(atividades) {
		var atividade = '';
		var div = '';
		for (var idx in atividades) {
			atividade = atividades[idx];
			div = div + '<div id="' + atividade.id + '" onclick="atividade.clickAtividade(this.id);">' + atividade.nome + '</div>'
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

	clickAtividade : function() {
		// verifica se está no modo gerente ou normal
		if (js.modoGerente()) {
			atividade.abreCadastroAtividade();
		} else {
			atividade.abreDetalheAtividade();
		}
	}

};