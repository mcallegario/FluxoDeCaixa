import { Request, Response } from 'express';
import Lancamento from '../models/lancamento';
import Consolidado from '../models/consolidado';
import LancamentoService from '../repositories/lancamentoRepository';

async function addUpdateEntry(req: Request, res: Response) {
    const lancamento = req.body as Lancamento;
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

async function consolidatedDaily(req: Request, res: Response) {
    const consolidado = await LancamentoService.consolidatedDaily();
    res.json(consolidado);
}

export default {
    addUpdateEntry,
    deleteEntry,
    consolidatedDaily,
    getEntry,
    getAllEntrys
} 

