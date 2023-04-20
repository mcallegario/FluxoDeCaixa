import { tipoLancamentoType } from '../enums/index';
export default class Lancamento {
    id: number;
    data: string;
    descricao: string;
    tipo: tipoLancamentoType;
    valor: number;

    private static nextId = 10; // gerar ids auto incrementais a partir do 10
 
    constructor(data: string, descricao: string, tipo: tipoLancamentoType, valor:number) {
        this.id = Lancamento.nextId++;
        this.data = data;
        this.descricao = descricao;
        this.tipo = tipo;
        this.valor = valor;
        
    }
  }
  