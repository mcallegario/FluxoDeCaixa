import express from 'express';
import LancamentoController  from '../controllers/lancamentoController';

const router = express.Router();

router.get('/', LancamentoController.getAllEntrys);
router.get('/consolidated', LancamentoController.consolidatedDaily);
router.get('/:id', LancamentoController.getEntry);

router.post('/', LancamentoController.addUpdateEntry);

router.delete('/:id', LancamentoController.deleteEntry);


export default router;