/*
* Henrique Guarnieri
* 10/10/2014
* Exibe os cardápios do dia atual do restaurante da FZEA
*/

var fzea = {
  /**
   * URL que armazena os cardápios
   *
   * @type {string}
   * @private
   */
  url_: 'http://cardapiofzea.tk/cardapio/lista',

  /**
   * Envia uma solicitação a URL para obter o JSON dos cardapios
   *
   * @public
   */
  getCardapio: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.url_, true);
    req.onload = this.showCardapio_;
    req.send(null);
  },

  showCardapio_: function (e) {
    var cardapios = JSON.parse(this.responseText);
    var data = new Date();

    var dia = String(data.getDate());
    var mes = String(data.getMonth() + 1);
    var ano = String(data.getYear() + 1900);

    var jantar = null;
    var almoco = null;

    for(i = 0; i < cardapios.length; i++) {
      var c = cardapios[i];
      var cDia = c.data.substr(8, 2);
      var cMes = c.data.substr(5, 2);
      var cAno = c.data.substr(0, 4);

      if (dia === cDia && mes === cMes && ano === cAno) {
        if (c.tipo == "A") {
          almoco = c;
        } else if (c.tipo == "J") {
          jantar = c;
        }
      }
    }

    if (data.getDay() == 0 || data.getDay() == 6) {
      var tabela = "<table style='text-align: center;'>" +
                   "<thead>" +
                      "<tr><th colspan=\"2\">Cardápio de Hoje</th></tr>" +
                      "<tr><th style='width: 50%; font-size: 12px;'>Almoço</th><th style='width: 50%; font-size: 12px;'>Jantar</th></tr>" + 
                   "</thead>" +
                   "<tbody>" +
                   "<tr>" +
                      "<td colspan=\"2\">Em sábados e domingos não são servidas refeições :(</td>" +
                   "</tr>" +
                   "</tbody>" +
                   "</table>";
    } else {

      var almocoPrincipal = almoco.prato_principal.nome;
      var almocoGuarnicao = almoco.prato_guarnicao.nome;
      var almocoSobremesa = almoco.prato_sobremesa.nome;

      var jantarPrincipal = jantar.prato_principal.nome;
      var jantarGuarnicao = jantar.prato_guarnicao.nome;
      var jantarSobremesa = jantar.prato_sobremesa.nome;

      var tabela = "<table style='text-align: center;'>" +
                   "<thead>" +
                      "<tr><th colspan=\"2\">Cardápio de Hoje</th></tr>" +
                      "<tr><th style='width: 50%; font-size: 12px;'>Almoço</th><th style='width: 50%; font-size: 12px;'>Jantar</th></tr>" + 
                   "</thead>" +
                   "<tbody>" +
                   "<tr>" +
                      "<td>" + almocoPrincipal + "</td>" +
                      "<td>" + jantarPrincipal + "</td>" +
                   "</tr>" +
                   "<tr>" +
                      "<td>" + almocoGuarnicao + "</td>" +
                      "<td>" + jantarGuarnicao + "</td>" +
                   "</tr>" +
                   "<tr>" +
                      "<td>" + almocoSobremesa + "</td>" +
                      "<td>" + jantarSobremesa + "</td>" +
                   "</tr>" +
                   "</tbody>" +
                   "</table>";
    }
    document.getElementById("cardapio").innerHTML = tabela;

  },
};

// Executa o script ao finalizar de carregar
document.addEventListener('DOMContentLoaded', function () {
  fzea.getCardapio();
});
