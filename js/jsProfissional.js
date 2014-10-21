var jsProfissional = {

	profissionalAtual : {},

	abreProfissionais : function() {
		// troca o conteúdo da página
		js.abreTela('lista.html');
		// troca o rodapé pra lista
		js.trocaRodape('lista');
		// busca e constrói as instalações
		jsProfissional.buscaProfissionais();
		// ajusta localização do header
		js.ajustaHeader();
		// troca o título da página
		js.trocaTitulo('profissionais', 'definir');		
	},

	buscaProfissionais : function() {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaProfissionais"
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (profissionais) {
				jsProfissional.montaProfissionais(profissionais);
			}
		);
	},

	montaProfissionais : function(profissionais) {
		var profissional = '';
		var div = '';
		for (var idx in profissionais) {
			profissional = profissionais[idx];
			div = div + js.montaItemLista(profissional.idprofissional, 'jsProfissional.clickProfissional(this.id);', profissional.nome);
		}
		div = div + '<div id="tela" name="listaProfissionais"></div>';
		$("#conteudo").html(div);
	},	

	clickProfissional : function(profissional) {
		jsProfissional.profissionalAtual = profissional;

		// verifica se está no modo gerente ou normal
		if (js.modoGerente()) {
			jsProfissional.abreAlteraProfissional();
		} else {
			jsProfissional.abreDetalheProfissional();
		}
	},	

	abreCadastroProfissional : function() {
		js.abreTela('cadastroProfissional.html');
		js.trocaTitulo('cadastro de profissional', 'definir');
	},	

	abreAlteraProfissional : function() {
		// troca o conteúdo da página
		jsProfissional.abreCadastroProfissional();
		// preenche os campos
		jsProfissional.buscaUmProfissional(jsProfissional.profissionalAtual);
	},	

	buscaUmProfissional : function(idprofissional) {
		// parâmetros para o backend
		var params = {
			"funcao" : "buscaUmProfissional",
			"idprofissional" : idprofissional
		};

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function (profissional) {
				js.preencheFormulario(profissional);
				js.trocaRodape('cadastro');
			}
		);
	},

	novoProfissional : function() {
		jsProfissional.abreCadastroProfissional();
	},

	salvaProfissional : function() {
		var idprofissional = $('#idprofissional').val();
		var nome = $('#nome').val();

		// parâmetros para o backend
		var params = {
			"funcao" : "salvaProfissional",
			"idprofissional" : idprofissional,
			"nome" : nome
		}

		// chama o backend
		js.chamaServidor(
			params,
			// callback
			function () {
				alert('Profissional salvo com sucesso.');
				js.abreTelaAnterior();
			}
		);
	}	

};