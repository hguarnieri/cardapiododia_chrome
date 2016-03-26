/*
* Henrique Guarnieri
* 26/03/2016
* Exibe os cardápios do restaurante da FZEA
*/

var fzea = {
  /**
   * URL que armazena os cardápios
   *
   * @type {string}
   * @private
   */
  url_: 'http://www2.comp.ufscar.br/~henrique.guarnieri/cardapiov3/cardapio.txt',

  /**
   * Envia uma solicitação à URL para obter a lista dos cardápios
   *
   * @public
   */
  getCardapio: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.url_, true);
    req.overrideMimeType('text/xml; charset=iso-8859-1');
    req.onload = this.showCardapio_;
    req.send(null);
  },

  showCardapio_: function (e) {
    var days = this.responseText.split("****!\n");
    var data = new Date();
    var today = data.getDay();

    var cardapios = [];

    for(i = 0; i < days.length; i++) {
      var items = days[i].split("!\n")

      cardapios[i] = [];
      for (k = 0; k < items.length - 1; k++) {
          if (items[k] == "-") {
            cardapios[i][k] = "Não Informado";
          } else {
            cardapios[i][k] = items[k];
          }
      }
    }

    if (today == 0 || today == 6) {
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

      var almocoPrincipal = cardapios[today - 1][0];
      var almocoSegundaOpcao = cardapios[today - 1][1]
      var almocoGuarnicao = cardapios[today - 1][2];
      var almocoSalada = cardapios[today - 1][3];
      var almocoSobremesa = cardapios[today - 1][4];
      var almocoSuco = cardapios[today - 1][5];

      var jantarPrincipal = cardapios[(today - 1) + 5][0];
      var jantarSegundaOpcao = cardapios[(today - 1) + 5][1]
      var jantarGuarnicao = cardapios[(today - 1) + 5][2];
      var jantarSalada = cardapios[(today - 1) + 5][3];
      var jantarSobremesa = cardapios[(today - 1) + 5][4];
      var jantarSuco = cardapios[(today - 1) + 5][5];

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
                      "<td>" + almocoSegundaOpcao + "</td>" +
                      "<td>" + jantarSegundaOpcao + "</td>" +
                   "</tr>" +
                   "<tr>" +
                      "<td>" + almocoGuarnicao + "</td>" +
                      "<td>" + jantarGuarnicao + "</td>" +
                   "</tr>" +
                   "<tr>" +
                      "<td>" + almocoSalada + "</td>" +
                      "<td>" + jantarSalada + "</td>" +
                   "</tr>" +
                   "<tr>" +
                      "<td>" + almocoSobremesa + "</td>" +
                      "<td>" + jantarSobremesa + "</td>" +
                   "</tr>" +
                   "<tr>" +
                      "<td>" + almocoSuco + "</td>" +
                      "<td>" + jantarSuco + "</td>" +
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
