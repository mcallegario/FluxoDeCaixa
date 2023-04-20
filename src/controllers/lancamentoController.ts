import { Request, Response } from 'express';
import Lancamento from '../models/lancamento';
import LancamentoService from '../repositories/lancamentoRepository';

async function addUpdateEntry(req: Request, res: Response) {
    const lancamento = req.body as Lancamento;
    // se o objeto recebido contém um id será realizado alteração caso contrário será inclusão
    if (lancamento.id){
        await LancamentoService.updateEntry(lancamento);
    }else{
        await LancamentoService.addEntry(lancamento);
    }
    res.sendStatus(201); //sucesso em adição/alteracao
}

async function deleteEntry(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await LancamentoService.deleteEntry(id);
    res.sendStatus(204);//sucesso sem retorno (geralmente exclusão)
}

async function getAllEntrys(req: Request, res: Response) {
    const lancamentos = await LancamentoService.getAllEntrys();
    res.json(lancamentos);
}

async function getEntry(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const lancamento = await LancamentoService.getEntry(id);
    res.json(lancamento);
}

async function getAllConsolidatedDaily(req: Request, res: Response) {
    const consolidado = await LancamentoService.getAllConsolidatedDaily();
    res.json(consolidado);
}


async function getConsolidatedDaily(req: Request, res: Response) {
    const data = req.params.data;
    const consolidado = await LancamentoService.getConsolidatedDaily(data);
    res.json(consolidado);
}

export default {
    addUpdateEntry,
    deleteEntry,
    getAllConsolidatedDaily,
    getConsolidatedDaily,
    getEntry,
    getAllEntrys
} 

