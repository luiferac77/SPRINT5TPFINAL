import IRepository from "./IRepository.mjs";
import Pais from '../models/Pais.mjs';
import mongoose from "mongoose";

import { promises as fs } from 'fs'; //solo lo uso para pruebas con arhivo json 
import { join } from "path"; //solo lo uso para pruebas con arhivo json
import { fileURLToPath } from "url"; //solo lo uso para pruebas con arhivo json

const uriweb = 'https://restcountries.com/v3.1/all';
const uriLocal = 'all.json';

class PaisRepository extends IRepository {

  async obtenerTodosLosPaisesApi(){
      try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          if(!response.ok){
              throw new Error(`Error en la solicitud a la api: ${response.status}`);
          }
          const paises = await response.json();
          const paisesFiltradosPorIdioma = paises.filter(pais => {
              return pais.languages && pais.languages.spa === 'Spanish';
          });
          
          const paisesMapeados = paisesFiltradosPorIdioma.map( pais => {
            //desestructuro lo que viene en pais y deseo sacar, y envío a rest lo que queda
            const { translation, 
                    tld, 
                    cca2, 
                    ccn3, 
                    cca3, 
                    cioc, 
                    idd, 
                    altSpellings, 
                    car, 
                    coatOfArms, 
                    postalCode, 
                    demonym, 
                    ...rest } = pais;
              //retorno lo que contiene rest, y agrego creador
              return {...rest, creador: 'LFA'};
          });

          return paisesMapeados;
      } catch (error) {
          console.error('error al consumir la api', error.message);
      }
  };

  async obtenerTodosLosPaisesBd(){
    return await Pais.find({
      "name.official": {$exists: true}, 
      creador: "LFA"
    });
  };

  async obtenerTodosLosPaisesLocal(){
    const rutaRaiz = '/home/lucho77/diplomatura/Sprint 5/SPRINT5TPFINAL/';
    const rutaArchivo = join(rutaRaiz, 'src','dataJson', 'all.json');
    //console.log(rutaArchivo);
    try {
      
      const datos = await fs.readFile(rutaArchivo,  'utf8');
      const paisesJson = JSON.parse(datos);
      
      const paisesFiltradosPorIdioma = paisesJson.filter(pais => {
        return pais.languages && pais.languages.spa === 'Spanish';
      });

      const paisesMapeados = paisesFiltradosPorIdioma.map( pais => {
        //desestructuro lo que viene en pais y deseo sacar, y envío a rest lo que queda
        const { translation, 
                tld, 
                cca2, 
                ccn3, 
                cca3, 
                cioc, 
                idd, 
                altSpellings, 
                car, 
                coatOfArms, 
                postalCode, 
                demonym, 
                ...rest } = pais;
          //retorno lo que contiene rest, y agrego creador
          return {...rest, creador: 'LFA'};
      });

      return paisesMapeados;

    } catch (error) {
      console.error('error al cargar el archivo', error);
    }
  };
/* =============== MÉTODOS CRUD PARA API, SIN TEMPLATE =============== */

  async crearPais(pais){
    return await Pais.create(pais);
  };

  async buscarPaisPorId(id){
    return await Pais.findById(id);
  };

  async modificarPais(id, datosActualizados){
    //con findByIdAndUpdate el documento se modifica 
    // y con {new: true } me aseguro de que devuelva 
    // el documento modificado para mostrar 
    return await Pais.findByIdAndUpdate(
      {_id: id}, 
      {$set: datosActualizados},
      {new: true }
    );
  };

  async eliminarPais(id){
    return await Pais.findByIdAndDelete(id);
  };

/* =============== FIN DE MÉTODOS CRUD PARA API, SIN TEMPLATE =============== */
/* =============== MÉTODOS DE MIGRACIÓN PARA API, SIN TEMPLATE =============== */
async migrarPaisesDesdeLocal(){
  
  const paises = await this.obtenerTodosLosPaisesLocal();
  
  if(paises.length === 0){
    console.log('no hay paises para migrar');
    return;
  } 

  const resultado = await Pais.insertMany(paises);
  
  return resultado;
  
};

async migrarPaisesDesdeApi(){
  const paises = await this.obtenerTodosLosPaisesApi();
  
  if(paises.length === 0){
    console.log('no hay paises para migrar');
    return;
  } 

  const resultado = await Pais.insertMany(paises);
  
  return resultado;
};
/* =============== FIN DE MÉTODOS DE MIGRACIÓN PARA API, SIN TEMPLATE =============== */

}

console.log('Pasa por /repository/PaisRepository.mjs');

export default new PaisRepository();

//const paisRepository = new PaisRepository();
//paisRepository.obtenerTodosLosPaises();
