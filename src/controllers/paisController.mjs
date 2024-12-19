import { 
    obtenerTodosLosPaisesApiService, 
    obtenerTodosLosPaisesLocalService, 
    obtenerTodosLosPaisesBdservice, 
    crearPaisService, 
    buscarPaisPorIdService, 
    modificarPaisService, 
    eliminarPaisService, 
    migrarPaisesDesdeLocalService,
    migrarPaisesDesdeApiService
 } from "../services/paisService.mjs";
import { renderizarPais, renderizarTodosLosPaises } from "../views/responseView.mjs";

/* CONTROLADORES PARA RENDERIZAR VISTAS */
export const renderizarInicioPaisController = async (req, res) => {
    res.render(
        'indexlayout', 
        {
            layout: 'layout', 
            title: 'Paises', 
            message: req.query.message || ''
        }
    );
};

export const renderizarDashboardPaisesController = async (req, res) => {
   // try {
        const paises = await obtenerTodosLosPaisesBdservice();
        //console.log(paises);
        if(paises){
            
            //console.log(paises);
            res.render(
                'dashboardlayout', 
                {
                    layout: 'layout', 
                    title: 'paises', 
                    message: req.query.message || '', 
                    paises
                }
            );    
        } else {
            res.render(
                'dashboardlayout', 
                {
                    layout: 'layout', 
                    title: 'paises', 
                    message: req.query.message || '', 
                    paises: []
                }
            );   
        }
        
    //} catch (error) {
        //res.status(500).send({mensaje: 'Error al obtener todos los paises', error: error.message});
    //}
};

export const renderizarImportarPaisesController = async (req, res) => {
    try {
        const paises = await obtenerTodosLosPaisesApiService();
        if(paises){
            res.render(
                'importarpaises', 
                {
                    layout: 'layout', 
                    title: 'paises', 
                    message: req.query.message || '', 
                    paises
                }
            );
        } else {
            res.status(404).send({mensaje: 'No se pudo encontrar el pais desde api con node-fetch'});
        }
    } catch (error) {
        res.status(404).send({mensaje: 'Error al devolver paises'});
        console.error('Error en obtenerTodosLosPaisesApiController', error);
    }
};

export const renderizarCrearPaisController = async (req, res) => {
    res.render(
        'crearpais', 
        {
            layout: 'layout', 
            title: 'Crear país', 
            message: req.query.message || '', 
        }
    );
};
export const renderizarEditPaisController = async (req, res) => {
    try {
        const { id } = req.params;
        const pais = await buscarPaisPorIdService(id);
        if (pais) {
            res.render(
                'editpais', 
                {
                    layout: 'layout', 
                    title: 'Editar País', 
                    message: req.query.message || '', 
                    pais
                }
            );
        }
    } catch (error) {
        //falra colocar el error
    }
};

export const renderizarConfirmarEliminarPaisController = async (req, res) => {
    try {
        const {id} = req.params;
        const pais = await buscarPaisPorIdService(id);
        if(pais){
            res.render(
                'eliminarpais', 
                {
                    layout: 'layout', 
                    title: 'Eliminar país',
                    message: req.query.message || '', 
                    pais
                }
            );
        } else {
            res.status(404).send({mensaje: 'No se pudo encontrar el pais'});
        }    
    } catch (error) {
        res.status(404).send({mensaje: 'Error al devolver paises'});
    }
}

export const crearPaisRenderController = async (req, res) => {

    const pais = req.body;
    const paisCreado = await crearPaisService(pais);
    console.log(paisCreado);
    if(paisCreado){
        res.redirect('/api/paises/dashboard');
    } else {
        res.status(500).send({mensaje: 'No se pudo crear el pais'})
    }

};

export const modificarPaisRenderController = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const paisActualizado = await modificarPaisService(id, datosActualizados);
        if(paisActualizado){
            res.redirect('/api/paises/dashboard');
        } else {
            res.status(404).send({mensaje: 'No se pudo modificar el pais'});
        }
    } catch (error) {
        
    }
};

export const eliminarPaisRenderController = async (req, res) => {
    const { id } = req.params; 
    const paisEliminado = await eliminarPaisService(id);
    if(paisEliminado){
        res.redirect('/api/paises/dashboard');
    } else {
        res.status(404).send({mensaje: 'no se pudo eliminar el país'});
    }
};

export const importarPaisesApiController = async (req, res) => {
    try {
        const resultado = await migrarPaisesDesdeApiService();
        if(resultado){
           
            const paises = await obtenerTodosLosPaisesBdservice();
            //console.log(paises);
            if(paises){
                
                //console.log(paises);
                res.render(
                    'dashboardlayout', 
                    {
                        layout: 'layout', 
                        title: 'paises', 
                        message: req.query.message || '', 
                        paises
                    }
                );    
            } else {
                res.render(
                    'dashboardlayout', 
                    {
                        layout: 'layout', 
                        title: 'paises', 
                        message: req.query.message || '', 
                        paises: []
                    }
                );   
            }

        }
    } catch (error) {
        res.status(500).send({
            mensaje: 'error al migrar países', 
            error: error.message
        });
    }
};
/* FIN DE CONTROLADORES PARA RENDERIZAR VISTAS */

export const obtenerTodosLosPaisesApiController = async (req, res) => {
    try {
        const paises = await obtenerTodosLosPaisesApiService();
        if(paises){
            res.send(renderizarTodosLosPaises(paises));
        } else {
            res.status(404).send({mensaje: 'No se pudo encontrar el pais desde api con node-fetch'});
        }
    } catch (error) {
        res.status(404).send({mensaje: 'Error al devolver paises'});
        console.error('Error en obtenerTodosLosPaisesApiController', error);
    }
};

export const obtenerTodosLosPaisesBdController = async (req, res) => {
    try {
        const paises = await obtenerTodosLosPaisesBdservice();
        if(paises){
            res.send(renderizarTodosLosPaises(paises));
        } else {
            res.status(404).send({mensaje: 'No se pudo encontrar el paisen la bd'});
        }
    } catch (error) {
        res.status(404).send({mensaje: 'Error al devolver paises desde la bd'});
        console.error('Error en obtenerTodosLosPaisesBdController', error);
    }
};

export const obtenerTodosLosPaisesLocalController = async (req, res) => {
    try {
        const paises = await obtenerTodosLosPaisesLocalService();
        if(paises){
            res.send(renderizarTodosLosPaises(paises));
        } else {
            res.status(404).send({mensaje: 'No se pudo encontrar el pais desde local'});
        }
    } catch (error) {
        res.status(404).send({mensaje: 'Error al devolver paises desde local'});
        console.error('Error en obtenerTodosLosPaisesLocalController', error);
    }
};

export const crearPaisController = async (req, res) => {
    
    const pais = req.body;
    const paisCreado = await crearPaisService(pais);
    console.log(paisCreado);
    if(paisCreado){
        res.send(renderizarPais(paisCreado));
    } else {
        res.status(500).send({mensaje: 'No se pudo crear el pais'})
    }

};

export const buscarPaisPorIdController = async (req, res) => {
    const  { id } = req.params;
    const pais = await buscarPaisPorIdService(id);
    if(pais){
        res.send(renderizarPais(pais));
    } else {
        res.status(404).send({mensaje: 'no se pudo encontrar el país'});
    }
};

export const modificarPaisController = async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    const paisActualizado = await modificarPaisService(id, datosActualizados);
    if(paisActualizado){
        res.send(renderizarPais(paisActualizado));
    } else {
        res.status(404).send({mensaje: 'No se pudo modificar el pais'});
    }
};

export const eliminarPaisController = async (req, res) => {
    const { id } = req.params; 
    const paisEliminado = await eliminarPaisService(id);
    if(paisEliminado){
        res.send(renderizarPais(paisEliminado));
    } else {
        res.status(404).send({mensaje: 'no se pudo eliminar el país'});
    }
};

export const eliminarPaisJsonController = async (req, res) => {
    const { id } = req.params; 
    try {
        const paisEliminado = await eliminarPaisService(id); // Llamada al servicio
        if (paisEliminado) {
            res.status(200).send({ 
                mensaje: 'País eliminado correctamente',
                id: paisEliminado._id
            });
        } else {
            res.status(404).send({ mensaje: 'País no encontrado, no se pudo eliminar' });
        }
    } catch (error) {
        console.error('Error en eliminarPaisJsonController:', error.message);
        res.status(500).send({ mensaje: 'Error interno al eliminar el país', error: error.message });
    }
};


export const migrarPaisesDesdeLocalController = async (req, res) => {
    try {
        const resultado = await migrarPaisesDesdeLocalService();
        res.status(201).send({
            mensaje: `${resultado.length} paises migrados`,
            dqatos: resultado
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'error al migrar países', 
            error: error.message
        });
    }

};

console.log('pasa por /controllers/paisController.mjs');