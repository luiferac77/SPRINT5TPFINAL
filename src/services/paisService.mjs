import PaisRepository from '../repository/PaisRepository.mjs';

export const obtenerTodosLosPaisesApiService = async () => {
    //console.log(PaisRepository.obtenerTodosLosPaises);
    return await PaisRepository.obtenerTodosLosPaisesApi();
};

export const obtenerTodosLosPaisesBdservice = async () => {
    return await PaisRepository.obtenerTodosLosPaisesBd();
};

export const obtenerTodosLosPaisesLocalService = async () => {
    return await PaisRepository.obtenerTodosLosPaisesLocal();
};

export const crearPaisService = async (pais) => {
    return await PaisRepository.crearPais(pais);
};

export const buscarPaisPorIdService = async (id) => {
    return await PaisRepository.buscarPaisPorId(id);
};

export const modificarPaisService = async (id, datosActualizados) => {
    return await PaisRepository.modificarPais(id, datosActualizados);
};

export const eliminarPaisService = async (id) => {
    return await PaisRepository.eliminarPais(id);
};

export const migrarPaisesDesdeLocalService = async () => {
    return await PaisRepository.migrarPaisesDesdeLocal();
};

export const migrarPaisesDesdeApiService = async () => {
    return await PaisRepository.migrarPaisesDesdeApi();
};

console.log('pasa por /services/paisService.mjs');