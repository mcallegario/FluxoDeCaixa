import Lancamento from '../models/lancamento';
import Consolidado from '../models/consolidado';
import { tipoLancamentoType } from '../enums/index';

//os metodos abaixo simular o comportamento dos bancos de dados, porém os dados estão em um array de memória
let lancamentos: Lancamento[] = [
    {
        id: 1,
        data: '2023-04-10T03:00:00.000Z',
        descricao: "teste 1",
        tipo: tipoLancamentoType.debito,
        valor: 100.00
    },{
        id: 2,
        data: '2023-04-10T03:00:00.000Z',
        descricao: "teste 2",
        tipo: tipoLancamentoType.credito,
        valor: 200.00
    },{
        id: 3,
        data: '2023-04-10T03:00:00.000Z',
        descricao: "teste 3",
        tipo: tipoLancamentoType.debito,
        valor: 300.00
    },{
        id: 4,
        data: '2023-04-11T03:00:00.000Z',
        descricao: "teste 4",
        tipo: tipoLancamentoType.credito,
        valor: 300.00
    },{
        id: 5,
        data: '2023-04-11T03:00:00.000Z',
        descricao: "teste 5",
        tipo: tipoLancamentoType.debito,
        valor: 150.00
    }
];
function sortEntrys() {
    //ordena os lançamentos por data crescente
    lancamentos.sort(function(a, b) {
        var keyA = new Date(a.data),
            keyB = new Date(b.data);
        // Compare as 2 datas
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
}
async function addEntry(lancamento: Lancamento): Promise<Lancamento | undefined> {
    return new Promise((resolve, reject) => {
        const newLancamento = new Lancamento(lancamento.data, lancamento.descricao,lancamento.tipo,lancamento.valor*1);
        lancamentos.push(newLancamento);

        sortEntrys();

        //Neste ponto seria implementado a rotina para incluir o registro no Banco de dados

        return resolve(lancamento);
    })
}
    
async function updateEntry(lancamento: Lancamento): Promise<Lancamento | undefined> {
    return new Promise((resolve, reject) => {
        const idx = lancamentos.findIndex((l) => l.id === lancamento.id);
        if (idx>=0){
            lancamentos[idx].descricao = lancamento.descricao;
            lancamentos[idx].tipo = lancamento.tipo;
            lancamentos[idx].valor = lancamento.valor;
            if (lancamentos[idx].data !== lancamento.data){
                lancamentos[idx].data = lancamento.data;
                sortEntrys();
            }

        }
        //Neste ponto seria implementado a rotina para alterar o registro no Banco de dados
        return resolve(undefined);
    })
}

async function deleteEntry(id: number): Promise<Lancamento[] | undefined> {
    return new Promise((resolve, reject) => {
        lancamentos = lancamentos.filter((l) => l.id !== id);
        //Neste ponto seria implementado a rotina para excluir o registro no Banco de dados
        return resolve(lancamentos);
    })
}

//consulta os lançamentos por data
async function getAllConsolidatedDaily(): Promise<Consolidado[] | undefined> {
    return new Promise( async (resolve, reject) => {
        //Neste ponto seria implementado a rotina para selecionar os registros no Banco de dados
        const consolidado = await getConsolidated(lancamentos);
        return resolve(consolidado);
    })
}

//consulta os lançamentos por data
async function getConsolidatedDaily(data:string): Promise<Consolidado[] | undefined> {
    return new Promise( async (resolve, reject) => {
        //Neste ponto seria implementado a rotina para selecionar os registros no Banco de dados
        const lancamentosDia = lancamentos.filter(c=>c.data === data);
        const consolidado = await getConsolidated(lancamentosDia);
        return resolve(consolidado);
    })
}

async function getConsolidated(lancamentos:Lancamento[]): Promise<Consolidado[] | undefined> {
    return new Promise((resolve, reject) => {
        const consolidado:Consolidado[] = [];
        lancamentos.forEach((lancamento)=>{
            let idx = consolidado.findIndex(c=>c.data === lancamento.data);
            let valor = lancamento.valor;
            if (lancamento.tipo===tipoLancamentoType.debito) valor *= -1;
            if (idx>=0){
                consolidado[idx].valor += valor;
            }else{
                consolidado.push(new Consolidado(lancamento.data,valor));
            }
        })
        return resolve(consolidado);
    })
}


//ler o lançamento de um id
async function getEntry(id: number): Promise<Lancamento | undefined> {
    return new Promise((resolve, reject) => {
        //Neste ponto seria implementado a rotina para selecionar o registro no Banco de dados

        return resolve(lancamentos.find(c => c.id === id));
    })
}

//ler todos os lançamentos
async function getAllEntrys(): Promise<Lancamento[]> {
    return new Promise((resolve, reject) => {
        //Neste ponto seria implementado a rotina para selecionar os registros no Banco de dados
        return resolve(lancamentos);
    })
}

export default {
    addEntry,
    updateEntry,
    deleteEntry,
    getAllConsolidatedDaily,
    getConsolidatedDaily,
    getEntry,
    getAllEntrys
}    
