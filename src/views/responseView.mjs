export const renderizarPais = (pais) => {
    return {
        Nombre: pais.name.common,
        Nombre_oficial: pais.name.official,
        Capital: pais.capital, 
        Fronteras: pais.borders, 
        Area: pais.area, 
        Poblacion: pais.population, 
        creador: pais.creador
    };
};
export const renderizarTodosLosPaises = (paises) => {
    return paises.map(pais => renderizarPais(pais));
};