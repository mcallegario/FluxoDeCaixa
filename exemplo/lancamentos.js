//** Carrega todos os lançamentos, porém em uma aplicação de produção o ideal e utilizar uma rotina de paginação  */

function getLancamentos() {
    return $.ajax({
        url: 'http://localhost:3000/lancamento/v1',
        type: 'GET',
        dataType: 'json',
        success: function (lancamentos) {
            window.lancamentos = lancamentos;
            getAllLancamentosSuccess();
        },
        error: function (request, message, error) {
            window.lancamentos = [];
            handleException(request, message, error);
        }
    });
}


function salvarLancamento(lancamento) {
    $.ajax({
        url: 'http://localhost:3000/lancamento/v1',
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(lancamento),        
        success: function () {
            getAllLancamentos();
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function excluirLancamento(id) {
    if (confirm("Confirme a exclusão do lançamento?")){
        $.ajax({
            url: 'http://localhost:3000/lancamento/v1/' + id,
            type: 'DELETE',
            success: function (lancamento) {
                getAllLancamentos();
            },
            error: function (request, message, error) {
                handleException(request, message, error);
            }
        }); 
    }
}



//rotina para exibir as mensagem de erro 
function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
      msg += "Message" + request.responseJSON.Message + "\n";
    }
    alert(msg);
}
  
//após carregar dos os lançamentos iniciar o processamento para montagem da tabela
function getAllLancamentosSuccess() {
    let saldoTotal = 0;
    let saldoDiario = {data:window.lancamentos[0].data,valor:0}
    clearTableRows();
    $.each(window.lancamentos, function (index, lancamento) {

        if (saldoDiario.data == lancamento.data){
            saldoDiario.valor += lancamento.valor*lancamento.tipo;
        }else{
            saldoAddRow(saldoDiario);
            saldoDiario.data =lancamento.data;
            saldoDiario.valor = lancamento.valor*lancamento.tipo;
        }
        lancamentoAddRow(lancamento);

        saldoTotal += lancamento.valor*lancamento.tipo;
    });
    saldoAddRow(saldoDiario);
    saldoTotalChangeTableFoot(saldoTotal);
}

function clearTableRows() {
    $("#lancamentos-table").children().remove()
}

function lancamentoAddRow(lancamento) {
     $("#lancamentos-table").append(lancamentoBuildTableRow(lancamento));
}

function lancamentoBuildTableRow(lancamento) {
    var ret =
      `<tr>
       <td>
        <i class="fa-sharp fa-solid fa-pen" onclick="alterarLancamento(${lancamento.id})" title="Alterar o lançamento"></i>
        <i class="fa-solid fa-trash-can" onclick="excluirLancamento(${lancamento.id})" title="Excluir o lançamento"></i>
       </td>
       <td>${moment(lancamento.data).format('DD/MM/YYYY')}</td>
       <td class="alignLeft">${lancamento.descricao}</td>
       <td>${(lancamento.tipo==-1?'Debito':'Credito')}</td>
       <td class="alignRight">${numeral(lancamento.valor).format('$ #,###,##0.00')}</td>
       </tr>`;

    return ret;
}

function saldoAddRow(saldo) {
    $("#lancamentos-table").append(saldoBuildTableRow(saldo));
}

function saldoBuildTableRow(saldo) {
    var ret =
    `<tr>
     <td colspan="4" class="saldoText">Saldo consolidado do dia ${moment(saldo.data).format('DD/MM/YYYY')}:</td>
     <td class="alignRight">${numeral(saldo.valor).format('$ #,##0.00')}</td>
     </tr>`;

  return ret;
}

function saldoTotalChangeTableFoot(saldo) {
    $("#saldoTotal").html(numeral(saldo).format('$ #,##0.00'));
}



