var jsProduto = {

	produtoAtual : {},

	abreProdutos : function() {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// busca e constrói as instalações
		jsProduto.buscaProdutos();
		// ajusta localização do header
		js.ajustaHeader();
		// troca o título da página
		js.trocaTitulo('produtos', 'icard');		
	},

	buscaProdutos : function() {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaProdutos"
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (produtos) {
				jsProduto.montaProdutos(produtos);
			}
		);
	},

	montaProdutos : function(produtos) {
		var produto = '';
		var div = '';
		for (var idx in produtos) {
			produto = produtos[idx];
			div = div + js.montaItemLista(produto.idproduto, 'jsProduto.clickProduto(this.id);', produto.nome);
		}
		div = div + '<div id="tela" name="listaProdutos"></div>';
		$("#conteudo").html(div);
	},	

	clickProduto : function(produto) {
		jsProduto.produtoAtual = produto;

		// verifica se está no modo gerente ou normal
		if (js.modoGerente()) {
			jsProduto.abreAlteraProduto();
		} else {
			jsProduto.abreDetalheProduto();
		}
	},	

	abreCadastroProduto : function() {
		js.abreTela('cadastroProduto.html');
		js.trocaTitulo('cadastro de produto', 'icard');
	},		

	abreAlteraProduto : function() {
		// troca o conteúdo da página
		jsProduto.abreCadastroProduto();
		// preenche os campos
		jsProduto.buscaUmProduto(jsProduto.produtoAtual);
	},	

	buscaUmProduto : function(idproduto) {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaUmProduto",
			"idproduto" : idproduto
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (produto) {
				js.preencheFormulario(produto);
				js.trocaRodape('cadastro');
				jsGrupo.buscaGrupos(function(grupos){
					jsGrupo.montaListaGrupos(grupos, produto.grupo_idgrupo);
				});
			}
		);
	},

	novoProduto : function() {
		jsProduto.abreCadastroProduto();
		js.trocaRodape('cadastro');
		jsGrupo.buscaGrupos(function(grupos){
			jsGrupo.montaListaGrupos(grupos);
		});
	},

	salvaProduto : function() {
		var idproduto = $('#idproduto').val();
		var nome = $('#nome').val();
		var preco = $('#preco').val();
		var descricao = $('#descricao').val();
		var grupo_idgrupo = $('#grupo_idgrupo').val();

		// parâmetros para o backend
		var params = {
			"funcao" : "salvaProduto",
			"idproduto" : idproduto,
			"nome" : nome,
			"preco" : preco,
			"descricao" : descricao,
			"grupo_idgrupo" : grupo_idgrupo
		}

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function () {
				alert('Produto salvo com sucesso.');
				js.abreTelaAnterior();
			}
		);
	}	

};