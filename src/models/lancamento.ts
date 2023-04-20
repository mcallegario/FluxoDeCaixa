import { tipoLancamentoType } from '../enums/index';
export default class Lancamento {
    id: number;
    data: string;
    descricao: string;
    tipo: tipoLancamentoType;
    valor: number;

    private static nextId = 5; // gerar ids auto incrementais 
 
    constructor(data: string, descricao: string, tipo: tipoLancamentoType, valor:number) {
        this.id = Lancamento.nextId++;
        this.data = data;
        this.descricao = descricao;
        this.tipo = tipo;
        this.valor = valor;
        
    }
  }
  