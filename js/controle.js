var js = {

	ajustaHeader : function() {
		$("#simple-menu").toggleClass('menu');
	},

	abreCardapio : function() {
		window.location = 'cardapio.html';
	},

	abreServicos : function() {
		window.location = 'servicos.html';
	},

	abreAtividades : function() {
		window.location = 'atividades.html';
	},

	abreInstalacoes : function() {
		window.location = 'instalacoes.html';
	},

	abreParcial : function() {
		window.location = 'parcial.html';
	},

	abreCheckout : function() {
		window.location = 'checkout.html';
	},

	abreSolicitacoes : function() {
		window.location = 'solicitacoes.html';
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
				var atividade = '';
				var div = '';
				for (var idx in atividades) {
					atividade = atividades[idx];
					div = div + "<div>" + atividade.nome + "</div>"
				}
				$("#conteudo").html(div);
			}
		);
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

	chamaServidor : function(params, callback) {
		$.ajax({
			url: "http://localhost:9090/",
			type: "GET",
			dataType: "json",
			data: params,
			contentType: "application/json",
			cache: false,
			timeout: 30000,
			success: function(data) {
				console.log('process sucess');
				callback(data);
			},
			error: function() {
				console.log('process error');
			}
		});
  	}
};
