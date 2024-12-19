import express from 'express';

import { validarPaises } from '../validators/paisesValidators.mjs';
import { handleValidationErrors } from '../validators/errorMiddleware.mjs';
import { procesarCamposMiddleware } from '../validators/procesarCamposMiddleware.mjs';

import { 
        obtenerTodosLosPaisesApiController, 
        obtenerTodosLosPaisesLocalController, 
        obtenerTodosLosPaisesBdController,
        crearPaisController, 
        crearPaisRenderController, 
        modificarPaisController,
        modificarPaisRenderController,  
        eliminarPaisController,
        buscarPaisPorIdController, 
        migrarPaisesDesdeLocalController, 
        renderizarInicioPaisController, 
        renderizarCrearPaisController, 
        renderizarDashboardPaisesController, 
        renderizarConfirmarEliminarPaisController, 
        eliminarPaisRenderController, 
        renderizarEditPaisController, 
        renderizarImportarPaisesController, 
        importarPaisesApiController,
    } from '../controllers/paisController.mjs';

const router = express.Router();

router.get('/paises', renderizarInicioPaisController);
router.get('/paises/dashboard', renderizarDashboardPaisesController);

router.get('/paises/paisesapi', obtenerTodosLosPaisesApiController);
router.get('/paises/paiseslocal', obtenerTodosLosPaisesLocalController);
router.get('/paises/paisbd',obtenerTodosLosPaisesBdController);
router.get('/paises/crear', renderizarCrearPaisController);
router.post('/paises/crear', procesarCamposMiddleware, validarPaises, handleValidationErrors, crearPaisRenderController);
router.post('/paises/migrarpaiseslocal', migrarPaisesDesdeLocalController);
router.get('/paises/importar', renderizarImportarPaisesController);
router.post('/paises/importar', importarPaisesApiController);

router.get('/paises/eliminar/:id', renderizarConfirmarEliminarPaisController);
router.get('/paises/buscarpais/:id', buscarPaisPorIdController);
router.get('/paises/modificar/:id', renderizarEditPaisController);
router.post('/paises/modificar/:id', procesarCamposMiddleware, validarPaises, handleValidationErrors, modificarPaisRenderController);
router.put('/paises/modificar/:id', validarPaises, handleValidationErrors, modificarPaisController);
router.post('/paises/eliminar/:id', eliminarPaisRenderController);
router.delete('/paises/eliminar/:id', eliminarPaisController);

console.log('pasa por /routes/paisRoutes.mjs');

export default router;