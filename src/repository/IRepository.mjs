class IRepository{
    
    obtenerTodosLosPaisesApi(){
        throw new Error('Método obtenerTodosLosPaises() no implementado');
    };

    obtenerTodosLosPaisesLocal(){
        throw new Error('Método obtenerTodosLosPaisesLocal() no implementado');
    };

    obtenerTodosLosPaisesBd(){
        throw new Error('Método obtenerTodosLosPaisesBd() no implementado');
    };

    crearPais(){
        throw new Error('Método crearPais() no implementado');
    };

    buscarPaisPorId(id){
        throw new Error('Método buscarPaisPorId(id) no implementado');
    };

    modificarPais(id, datosActualizados){
        throw new Error('Método modificarPais() no implementado');
    };

    eliminarPais(id){
        throw new Error('Método eliminarPais() no implementado');
    };

    migrarPaisesDesdeLocal(){
        throw new Error('Método migrarPaisesDesdeLocal() no implementado');
    }

    migrarPaisesDesdeApi(){
        throw new Error('Método migrarPaisesDesdeApi() no implementado');
    };

}

console.log('Pasa por /repository/IRepository.mjs');
export default IRepository;