var js = {

  	modo : 'user',
  	telaAnterior : '',
  	telaAtual : 'index.html', 

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
  	},

  	preencheFormulario : function(dados) {
  		// preenche o formulário de cadastro, os campos no html (id) devem estar com os mesmos nomes que no banco
  		var valor;
  		for (var campo in dados) {
  			valor = dados[campo];
  			$('#' + campo).val(valor);
  		}
  	},

  	trocaRodape : function(tipo) {
  		if (tipo == 'cadastro') {
			$('#footer').load('footerCadastro.html');  			
  		} else if (tipo == 'lista') {
            if (js.modoGerente()) {
                $('#footer').load('footerListaGerente.html');      
            } else {
                $('#footer').load('footerLista.html');      
            }
  		}
  	},

  	abreTela : function(tela) {
  		js.telaAnterior = js.telaAtual;
  		js.telaAtual = tela;
		$('#conteudo').load(tela);
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
            $('#itensMenu').load('menuGerente.html');           
        } else {
            $('#itensMenu').load('menu.html');           
        }
    },

    trocaTitulo : function(novoTitulo) {
    	$('#titulo').html(novoTitulo);
    }

};
