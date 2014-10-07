var js = {

  	modo : 'gerente',

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

	abreCardapio : function() {
		window.location = 'cardapio.html';
	},

	abreServicos : function() {
		window.location = 'servicos.html';
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

	abreSolicitacoes : function() {
		window.location = 'solicitacoes.html';
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
