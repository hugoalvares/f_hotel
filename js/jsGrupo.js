var jsGrupo = {

	grupoAtual : {},

	abreGrupos : function() {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// troca o rodapé pra lista
		js.trocaRodape('lista');
		// busca e constrói as instalações
		jsGrupo.buscaGrupos(function(grupos){
			jsGrupo.montaGrupos(grupos);
		});
		// ajusta localização do header
		js.ajustaHeader();
		// troca o título da página
		js.trocaTitulo('grupos', 'definir');		
	},

	buscaGrupos : function(callback) {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaGrupos"
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (grupos) {
				callback(grupos);
			}
		);
	},

	montaGrupos : function(grupos) {
		var grupo = '';
		var div = '';
		for (var idx in grupos) {
			grupo = grupos[idx];
			div = div + js.montaItemLista(grupo.idgrupo, 'jsGrupo.clickGrupo(this.id);', grupo.nome);
		}
		div = div + '<div id="tela" name="listaGrupos"></div>';
		$("#conteudo").html(div);
	},

	montaListaGrupos : function(grupos, grupo_idgrupo)	 {
		var grupo = '';
		var options = '';
		for (var idx in grupos) {
			grupo = grupos[idx];
			if (grupo_idgrupo == grupo.idgrupo) {
				options = options + '<option value="' + grupo.idgrupo + '" selected>' + grupo.idgrupo + ' - ' + grupo.nome + '</option>';
			} else {
				options = options + '<option value="' + grupo.idgrupo + '">' + grupo.idgrupo + ' - ' + grupo.nome + '</option>';
			}
		}
		$("#grupo_idgrupo").html(options);
	},

	clickGrupo : function(grupo) {
		jsGrupo.grupoAtual = grupo;

		// verifica se está no modo gerente ou normal
		if (js.modoGerente()) {
			jsGrupo.abreAlteraGrupo();
		} else {
			jsGrupo.abreDetalheGrupo();
		}
	},	

	abreCadastroGrupo : function() {
		js.abreTela('cadastroGrupo.html');
		js.trocaTitulo('cadastro de grupo', 'definir');
	},			

	abreAlteraGrupo : function() {
		// troca o conteúdo da página
		jsGrupo.abreCadastroGrupo();
		// preenche os campos
		jsGrupo.buscaUmGrupo(jsGrupo.grupoAtual);
	},	

	buscaUmGrupo : function(idgrupo) {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaUmGrupo",
			"idgrupo" : idgrupo
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (grupo) {
				js.preencheFormulario(grupo);
				js.trocaRodape('cadastro');
			}
		);
	},

	novoGrupo : function() {
		jsGrupo.abreCadastroGrupo();
	},

	salvaGrupo : function() {
		var idgrupo = $('#idgrupo').val();
		var nome = $('#nome').val();

		// parâmetros para o backend
		var params = {
			"funcao" : "salvaGrupo",
			"idgrupo" : idgrupo,
			"nome" : nome
		}

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function () {
				alert('Grupo salvo com sucesso.');
				js.abreTelaAnterior();
			}
		);
	}	

};