//Inicia o carrregamento das informações
$(document).ready(()=>{
    $( "#tabs" ).tabs();

    setFields();
    
    setEvents();

    getAllLancamentos();
})

//configura a API numeral para o PT-BR e mascara do valor
function setFields() {
    numeral.register('locale', 'pt-br', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'ème';
        },
        currency: {
            symbol: 'R$'
        }
    });
    numeral.locale('pt-br');

    $('#valor').mask("#.##0,00", {reverse: true});
}

//configura os eventos dos botões do formulário
function setEvents() {
    $("#limpar").on('click',limparFormulario);
    $("#lancamento-form" ).submit(function( event ) {
        inserirLancamento();
        event.preventDefault();
    });
}

//executa a limpeza do formulário
function limparFormulario() {
    $("#id").val("");
    $("#data").val("");
    $("#descricao").val("");
    $("#tipo").val("");
    $("#valor").val("");
    $("#inserir").text('Inserir');

}

//pegar as informações do formulário da tela e executa o salvamento
function inserirLancamento(){
    let data = $("#data").val().split("-");
    const lancamento = {
        data: new Date(data[0],data[1]-1,data[2]),
        descricao: $("#descricao").val(),
        tipo: $("#tipo").val(),
        valor: $("#valor").val().replaceAll('.','').replace(',','.')*1
    }
    
    if ($("#id").val()){
        lancamento.id = $("#id").val();
        limparFormulario();
    }

    salvarLancamento(lancamento);
}   

function alterarLancamento(id) {
    const lancamento = window.lancamentos.find((item)=>(item.id==id));
    $("#id").val(lancamento.id);
    $("#data").val(moment(lancamento.data).format('YYYY-MM-DD'));
    $("#descricao").val(lancamento.descricao);
    $("#tipo").val(lancamento.tipo);
    $("#valor").val($("#valor").masked(lancamento.valor.toFixed(2)));
    $("#inserir").text('Alterar');
}


//** Carrega todos os lançamentos, porém em uma aplicação de produção o ideal e utilizar uma rotina de paginação  */

function getAllLancamentos(params) {
    getLancamentos().then(()=>{getConsolidado()})
}



