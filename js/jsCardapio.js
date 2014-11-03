jsCardapio = {

	produtoAtual : '',
	carrinho : [],

	abreCardapio : function () {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// troca o rodapé pra lista
		js.trocaRodape('footerCardapio');
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
		var grupos = cardapio.grupos;

		var grupo = '';
		var div = '';
		for (var idx in grupos) {
			grupo = grupos[idx];
			div = div + '<div class="apbloco" style="background-image:url(' + js.ipServidor + '/hotel/img/grupo/' + grupo.idgrupo + '.jpg);" id="' + grupo.idgrupo + '" onclick="jsCardapio.abreGrupo(this.id);"><div class="blocotitle"><div class="blcttl">' + grupo.nome + '</div></div></div><div id="produtos' + grupo.idgrupo + '" class="produto"></div>';
		}
		div = div + '<div id="tela" name="listaGrupos"></div>';
		$("#conteudo").html(div);
	},

	abreGrupo : function(idgrupo) {
		$('.produto').html('');

		var produtos = jsCardapio.cardapio.produtos;
		var produto = '';
		var divs = '';
		for (var idx in produtos) {
			produto = produtos[idx];
			if (produto.grupo_idgrupo == idgrupo) {
				divs = divs + '<div class="cardbox"> <div id="' + produto.idproduto + '" class="c2iinfo" onclick="jsCardapio.abreDetalheProduto(this.id);">' + produto.nome + ' </div> <div class="c2iqntdd">' + js.formataPreco(produto.preco) + '</div> </div>';
			}
		}
		$('#produtos' + idgrupo).html(divs);
	},

	abreDetalheProduto : function(idproduto) {
		jsCardapio.produtoAtual = idproduto;
		jsProduto.buscaUmProduto(idproduto, function(produto) {
			// tela, título, ícone, footer
			js.trocaTela('detalheProduto.html', produto.nome, 'icard', 'footerDetalheProduto');
			setTimeout(function(){
				js.preencheDetalhe(produto);
				$('#imgproduto').attr('src', js.ipServidor + '/hotel/img/produto/' + produto.idproduto + '.jpg');
			}, 100);
		});		
	},

	adicionarAoCarrinho : function() {
		var item = {
			'idproduto' :  $('#idproduto').html(),
			'nome' : $('#nome').html(),
			'quantidade' : $('#quantidade').val()
		}
		jsCardapio.carrinho.push(item);
		jsCardapio.abreCardapio();
		js.ajustaHeader();
	},

	abreCarrinho : function() {
		if (jsCardapio.carrinho.length == 0) {
			alert('Não há produtos no carrinho.');
		} else {
			js.trocaTela('carrinho.html', 'pedido', 'icard', 'footerCarrinho');		
			setTimeout(function(){
				jsCardapio.montaListaPedido();
			}, 100);			
		}
	},

	montaListaPedido : function() {
		var produto = '';
		var divs = '';
		for (var idx in jsCardapio.carrinho) {
			produto = jsCardapio.carrinho[idx];
			if (produto.quantidade == '') {
				produto.quantidade = '1';
			}
			divs = divs + '<div id="' + produto.idproduto + '">' + produto.quantidade + ' x ' + produto.nome + '</div>';
		}
		$('#conteudo').html(divs);	
	},

	transmitePedido : function() {
		alert("Pedido transmitido com sucesso.");
		jsCardapio.abreCardapio();
		js.ajustaHeader();
		jsCardapio.carrinho = [];
	}

}