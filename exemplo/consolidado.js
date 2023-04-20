//** Carrega todos os lançamentos, porém em uma aplicação de produção o ideal e utilizar uma rotina de paginação  */

function getConsolidado() {
    return $.ajax({
        url: 'http://localhost:3000/lancamento/v1/consolidated/',
        type: 'GET',
        dataType: 'json',
        success: function (consolidados) {
            window.consolidados = consolidados;
            getConsolidadoSuccess();
        },
        error: function (request, message, error) {
            window.consolidado = [];
            handleException(request, message, error);
        }
    });
}


//após carregar dos os lançamentos iniciar o processamento para montagem da tabela
function getConsolidadoSuccess() {
    let saldoTotal = 0;
    consolidadoClearTableRows();
    $.each(window.consolidados, function (index, consolidado) {
        consolidadoAddRow(consolidado);
        saldoTotal += consolidado.valor;
    });
    saldoConsolidadoChangeTableFoot(saldoTotal);
}

function consolidadoClearTableRows() {
    $("#consolidado-table").children().remove()
}

function consolidadoAddRow(consolidado) {
     $("#consolidado-table").append(consolidadoBuildTableRow(consolidado));
}

function consolidadoBuildTableRow(consolidado) {
    var ret =
      `<tr>
       <td>${moment(consolidado.data).format('DD/MM/YYYY')}</td>
       <td class="alignRight">${numeral(consolidado.valor).format('$ #,###,##0.00')}</td>
       </tr>`;

    return ret;
}


function saldoConsolidadoChangeTableFoot(saldo) {
    $("#saldoConsolidado").html(numeral(saldo).format('$ #,##0.00'));
}



