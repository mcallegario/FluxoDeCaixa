import express from 'express';
import LancamentoController  from '../controllers/lancamentoController';

const router = express.Router();

//endpoints de perquisa/recuperação
router.get('/all', LancamentoController.getAllEntrys);
router.get('/consolidated', LancamentoController.getAllConsolidatedDaily);
router.get('/consolidated/:data', LancamentoController.getConsolidatedDaily);
router.get('/get/:id', LancamentoController.getEntry);

//endpoints de alteração
router.post('/save', LancamentoController.addUpdateEntry);
router.delete('/delete/:id', LancamentoController.deleteEntry);


export default router;