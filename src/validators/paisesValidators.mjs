import { body } from "express-validator";

//Aquí voy a definir las reglas de validaciones para cada 
//conjunto de rutas o funcionalidades

export const validarPaises = [
    
    body('name.official')
        .trim()
        .escape()
        .notEmpty().withMessage('El nombre oficial del país es requerido')
        .isLength({min: 3, max:90}).withMessage('El nombre oficial del país debe tener entre 3 y 90 caracteres')
        .custom(value => {
            if (/^\d+$/.test(value)) {
                throw new Error('El nombre oficial del país no puede contener solo números');
            }
            return true;
        }), 
    
    body('area')
        .trim()
        .escape()
        //.notEmpty().withMessage('La edad es un valor requerido')
        .isNumeric().withMessage('El área debe ser un valor numérico')
        .custom((area) => area >= 0).withMessage('El área debe ser un valor positivo'), 
    
    body('capital')
        .isArray({min: 1}).withMessage('Capital debe ser un array con al menos un elemento'), 

    body('capital.*')
        .isString().withMessage('La capital debe ser un String')
        .notEmpty().withMessage('La capital no puede ser vacia')
        .custom((value) => {
            if (value.length < 3  || value.length > 90) {
                throw new Error('La capital debe tener entre 3 y 90 caracteres');
            }
                // Chequeo si es numérico (valores como "123", "12.34" o "-56" no deben ser válidos)
                if (!isNaN(Number(value))) {
                    throw new Error('Las capitales no pueden ser valores numéricos');
                }
    
            return true;
        }),
        
    body('borders')
        //.exists().withMessage("El campo 'borders' es obligatorio.")
        .isArray().withMessage("El campo 'borders' debe ser un array."),
    
    // Validar cada elemento del array `borders`
    // .* esto es una wildcard que me permite validar cada elemento del array 
    body('borders.*')
        .isString().withMessage('Los paises limitrofes debe ser alfabeticos')
        .isLength({ min: 3, max: 3 }).withMessage('Los paises limitrofes deben contener tres caracteres')
        .matches(/^[A-Z]+$/).withMessage('Los paises limitrofes deben contener solo letras mayusculas'),

        body('population')
        .trim()
        .escape()
        //.notEmpty().withMessage('La edad es un valor requerido')
        .isInt().withMessage('La población debe ser un valor numérico entero')
        .custom((area) => area >= 0).withMessage('La población debe ser un valor positivo'), 
    
    body('gini')
        .custom((gini) => {
            if (typeof gini !== 'object' || !gini.hasOwnProperty('2019')) {
                throw new Error('El campo gini debe ser un objeto que contenga únicamente la clave 2019');
            }
    
        const valor = gini['2019'];
        if (typeof valor !== 'number' || valor < 0 || valor > 100) {
            throw new Error('El índice Gini de 2019 debe ser un número entre 0 y 100');
        }
    
        return true;
    })
];