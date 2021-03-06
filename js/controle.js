var js = {

    ipServidor : 'http://localhost',
  	modo : 'gerente',
  	telaAnterior : '',
  	telaAtual : 'index.html', 
  	login : {},
  	telas : {
  		// geral
		'lista.html' : '/hotel/html/lista.html',

		// gerente
		'cadastroAtividade.html' : '/hotel/html/gerente/cadastroAtividade.html',
		'cadastroGrupo.html' : '/hotel/html/gerente/cadastroGrupo.html',
		'cadastroHospede.html' : '/hotel/html/gerente/cadastroHospede.html',
		'cadastroInstalacao.html' : '/hotel/html/gerente/cadastroInstalacao.html',
		'cadastroOperador.html' : '/hotel/html/gerente/cadastroOperador.html',
		'cadastroProduto.html' : '/hotel/html/gerente/cadastroProduto.html',
		'cadastroProfissional.html' : '/hotel/html/gerente/cadastroProfissional.html',
		'cadastroServico.html' : '/hotel/html/gerente/cadastroServico.html',
		'inicioOperador.html' : '/hotel/html/gerente/inicioOperador.html',

		// user
		'cardapio.html' : '/hotel/html/user/cardapio.html',
		'checkout.html' : '/hotel/html/user/checkout.html',
		'detalheAtividade.html' : '/hotel/html/user/detalheAtividade.html',
		'detalheServico.html' : '/hotel/html/user/detalheServico.html',
		'detalheInstalacao.html' : '/hotel/html/user/detalheInstalacao.html',
		'detalheProduto.html' : '/hotel/html/user/detalheProduto.html',
		'inicioUser.html' : '/hotel/html/user/inicioUser.html',
		'parcial.html' : '/hotel/html/user/parcial.html',
		'carrinho.html' : '/hotel/html/user/carrinho.html'
  	},
  	footers : {
  		'footerCadastro.html' : '/hotel/html/footer/footerCadastro.html',
  		'footerLista.html' : '/hotel/html/footer/footerLista.html',
  		'footerListaGerente.html' : '/hotel/html/footer/footerListaGerente.html',
  		'footerServico.html' : '/hotel/html/footer/footerServico.html',
  		'footerVoltar.html' : '/hotel/html/footer/footerVoltar.html',
  		'footerDetalheAtividade.html' : '/hotel/html/footer/footerDetalheAtividade.html',
  		'footerDetalheProduto.html' : '/hotel/html/footer/footerDetalheProduto.html',
  		'footerCardapio.html' : '/hotel/html/footer/footerCardapio.html',
  		'footerCarrinho.html' : '/hotel/html/footer/footerCarrinho.html'
  	},
  	menus : {
  		'menu.html' : '/hotel/html/menu/menu.html',
  		'menuGerente.html' : '/hotel/html/menu/menuGerente.html'
  	},

  	modoGerente : function() {
  		if (js.modo == "gerente") {
  			return true;
  		} else {
  			return false;
  		}
  	},

	ajustaHeader : function() {
		$("#simple-menu").toggleClass('menu');
	},

	chamaServidor : function(params, callback) {
		$.ajax({
			url: "http://127.0.0.1:9090/",
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
  	},

  	preencheFormulario : function(dados) {
  		// preenche o formulário de cadastro, os campos no html (id) devem estar com os mesmos nomes que no banco
  		var valor;
  		for (var campo in dados) {
  			valor = dados[campo];
  			$('#' + campo).val(valor);
  		}
  	},

	preencheDetalhe : function(dados) {
  		// preenche o formulário de cadastro, os campos no html (id) devem estar com os mesmos nomes que no banco
  		var valor;
  		for (var campo in dados) {
  			valor = dados[campo];
  			if (campo == 'preco') {
  				valor = js.formataPreco(valor);
  			}
  			$('#' + campo).html(valor);
  		}
  	},

  	formataPreco : function(valor) {
  		return 'R$ ' + valor.toFixed(2).replace('.', ',');
  	},

  	trocaRodape : function(tipo) {
  		if (tipo == 'cadastro') {
			$('#footer').load(js.footers['footerCadastro.html']);  			
  		} else if (tipo == 'lista') {
            if (js.modoGerente()) {
                $('#footer').load(js.footers['footerListaGerente.html']);      
            } else {
                $('#footer').load(js.footers['footerLista.html']);      
            }
  		} else if (tipo == 'servico') {
  			$('#footer').load(js.footers['footerServico.html']);      
  		} else if (tipo == 'footerVoltar') {
  			$('#footer').load(js.footers['footerVoltar.html']);      
  		} else if (tipo == 'footerDetalheAtividade') {
  			$('#footer').load(js.footers['footerDetalheAtividade.html']);      
  		} else if (tipo == 'footerDetalheProduto') {
  			$('#footer').load(js.footers['footerDetalheProduto.html']);      
  		} else if (tipo == 'footerCardapio') {
  			$('#footer').load(js.footers['footerCardapio.html']);      
  		} else if (tipo == 'footerCarrinho') {
  			$('#footer').load(js.footers['footerCarrinho.html']);      
  		}
  	},

  	abreTela : function(tela) {
  		js.telaAnterior = js.telaAtual;
  		js.telaAtual = tela;

		$('#conteudo').load(js.telas[tela]);
  	},

  	trocaTela : function(tela, titulo, icon, rodape) {
  		js.abreTela(tela);
  		js.trocaTitulo(titulo, icon);
  		js.trocaRodape(rodape);
  	},

  	abreTelaAnterior : function() {  		
  		var anterior = js.telaAnterior;
  		js.telaAnterior = js.telaAtual;
  		js.telaAtual = anterior;
  		
  		if (js.telaAnterior == 'cadastroAtividade.html') {
  			jsAtividade.abreAtividades();
  			js.ajustaHeader();
  			js.trocaRodape('lista');
  		} else if (js.telaAnterior == 'cadastroInstalacao.html') {
            jsInstalacao.abreInstalacoes();
            js.ajustaHeader();
            js.trocaRodape('lista');
        } else if (js.telaAnterior == 'cadastroServico.html') {
            jsServico.abreServicos();
            js.ajustaHeader();
            js.trocaRodape('lista');            
        } else if (js.telaAnterior == 'cadastroHospede.html') {
            jsHospede.abreHospedes();
            js.ajustaHeader();
            js.trocaRodape('lista');       
        } else if (js.telaAnterior == 'cadastroOperador.html') {
            jsOperador.abreOperadores();
            js.ajustaHeader();
            js.trocaRodape('lista');       
        } else if (js.telaAnterior == 'cadastroProfissional.html') {
            jsProfissional.abreProfissionais();
            js.ajustaHeader();
            js.trocaRodape('lista');       
        } else if (js.telaAnterior == 'cadastroGrupo.html') {
            jsGrupo.abreGrupos();
            js.ajustaHeader();
            js.trocaRodape('lista');       
        } else if (js.telaAnterior == 'cadastroProduto.html') {
            jsProduto.abreProdutos();
            js.ajustaHeader();
            js.trocaRodape('lista');       
        } else if (js.telaAnterior == 'detalheServico.html') {
        	jsServico.abreServicos();
        	js.ajustaHeader();
        	js.trocaRodape('lista');
        } else if (js.telaAnterior == 'detalheInstalacao.html') {
        	jsInstalacao.abreInstalacoes();
        	js.ajustaHeader();
        	js.trocaRodape('lista');
        } else if (js.telaAnterior == 'detalheAtividade.html') {
        	jsAtividade.abreAtividades();
        	js.ajustaHeader();
        	js.trocaRodape('lista');
        } else if (js.telaAnterior == 'detalheProduto.html') {
        	jsCardapio.abreCardapio();
        	js.ajustaHeader();
        	js.trocaRodape('footerCardapio');
        } else if (js.telaAnterior == 'carrinho.html') {
        	jsCardapio.abreCardapio();
        	js.ajustaHeader();
        	js.trocaRodape('footerCardapio');
        }
  	},

  	salvaRegistro : function() {
  		// pega o nome da tela
  		var tela = $('#tela').attr('name');

  		if (tela == 'cadastroAtividade') {
  			jsAtividade.salvaAtividade();
  		} else if (tela == 'cadastroInstalacao') {
            jsInstalacao.salvaInstalacao();
        } else if (tela == 'cadastroServico') {
            jsServico.salvaServico();
        } else if (tela == 'cadastroHospede') {
            jsHospede.salvaHospede();
        } else if (tela == 'cadastroOperador') {
            jsOperador.salvaOperador();
        } else if (tela == 'cadastroProfissional') {
            jsProfissional.salvaProfissional();
        } else if (tela == 'cadastroGrupo') {
            jsGrupo.salvaGrupo();
        } else if (tela == 'cadastroProduto') {
            jsProduto.salvaProduto();
        }
  	},

  	abreNovoRegistro : function() {
        js.trocaRodape('cadastro');

  		var tela = $('#tela').attr('name');

  		if (tela == 'listaAtividades') {
  			jsAtividade.novaAtividade();
  		} else if (tela == 'listaInstalacoes') {
            jsInstalacao.novaInstalacao();
        } else if (tela == 'listaServicos') {
            jsServico.novoServico();
        } else if (tela == 'listaHospedes') {
            jsHospede.novoHospede();
        } else if (tela == 'listaOperadores') {
            jsOperador.novoOperador();
        } else if (tela == 'listaProfissionais') {
            jsProfissional.novoProfissional();
        } else if (tela == 'listaGrupos') {
            jsGrupo.novoGrupo();
        } else if (tela == 'listaProdutos') {
            jsProduto.novoProduto();
        }
  	},

    preencheMenu : function() {
        if (js.modoGerente()) {
            $('#itensMenu').load(js.menus['menuGerente.html']);           
        } else {
            $('#itensMenu').load(js.menus['menu.html']);           
        }
    },

    trocaTitulo : function(novoTitulo, novoIcone) {
    	novoTitulo = '&nbsp' + novoTitulo;
    	$('#titulo').html(novoTitulo);

    	// tira o ícone atual
    	var iconeAtual = $('#tituloIcone').attr('class');
    	$('#tituloIcone').toggleClass(iconeAtual);

    	// coloca o novo ícone
    	$('#tituloIcone').toggleClass(novoIcone);
    },

    montaItemLista : function(id, funcao, nome, pasta) {
		return '<div class="apbloco" style="background-image:url(' + js.ipServidor + '/hotel/img/' + pasta + '/' + id + '.jpg);" id="' + id + '" onclick="' + funcao + '"><div class="blocotitle"><div class="blcttl">' + nome + '</div></div></div>';
    },

    abreTelaInicial : function() {
    	var tela = 'inicioUser.html';
    	if (js.modoGerente()) {
    		tela = 'inicioOperador.html';
    	}
    	js.trocaTela(tela, 'MYROOM', '', '');
    	js.preencheMenu();
    }

};
