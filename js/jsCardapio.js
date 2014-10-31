jsCardapio = {

	cardapio : {},

	abreCardapio : function () {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// troca o rodapé pra lista
		js.trocaRodape('lista');
		// busca e constrói o cardápio
		jsCardapio.buscaCardapio();
		// ajusta localização do header
		js.ajustaHeader();
		// troca o título da página
		js.trocaTitulo('cardápio', 'icard');
	},

	buscaCardapio : function() {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaCardapio"
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (cardapio) {
				jsCardapio.cardapio = cardapio;
				jsCardapio.montaCardapio(cardapio);
			}
		);
	},	

	montaCardapio : function(cardapio) {
		/*
		var grupo = '';
		var produto = '';
		var novoCardapio = {};
		for (var idxGrupo in cardapio.grupos) {
			grupo = cardapio.grupos[idxGrupo];
			novoCardapio[grupo.idgrupo] = grupo;
			for (var idxProduto in cardapio.produtos) {
				produto = cardapio.produtos[idxProduto];
				if (produto.grupo_idgrupo == grupo.idgrupo) {

				}
			}
		}
		*/

		var grupos = cardapio.grupos;

		var grupo = '';
		var div = '';
		for (var idx in grupos) {
			grupo = grupos[idx];
			div = div + js.montaItemLista(grupo.idgrupo, 'jsCardapio.abreGrupo(this.id);', grupo.nome, 'grupo');
		}
		div = div + '<div id="tela" name="listaGrupos"></div>';
		$("#conteudo").html(div);
	},

	abreGrupo : function(idgrupo) {
		var produtos = jsCardapio.cardapio.produtos;
		var produto = '';
		var div = '';
		for (var idx in produtos) {
			produto = produtos[idx];
			if (produto.grupo_idgrupo == idgrupo) {
				div = div + '<div id="produto' + produto.idproduto + '">' + produto.nome + '</div>';
			}
		}
		console.log($('#' + idgrupo).html());
	}

}