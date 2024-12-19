export const procesarCamposMiddleware = (req, res, next) => {
    try {
        // Convertir 'capital' a array
        if (typeof req.body.capital === 'string') {
            req.body.capital = req.body.capital
                .split(',')
                .map(capital => capital.trim())
                .filter(capital => capital !== '');
        }

        // Convertir 'borders' a array
        if (typeof req.body.borders === 'string') {
            req.body.borders = req.body.borders
                .split(',')
                .map(border => border.trim())
                .filter(border => border !== '');
        }

        // Convertir 'gini.2019' a objeto
        if (req.body['gini.2019']) {
            const giniValue = parseFloat(req.body['gini.2019']);
            if (!isNaN(giniValue)) {
                req.body.gini = { '2019': giniValue }; // Solo incluir 2019
            }
            delete req.body['gini.2019']; // Eliminar el campo original
        }

        next(); // Pasar al siguiente middleware
    } catch (error) {
        console.error('Error en procesarCamposMiddleware:', error.message);
        res.status(400).send({ mensaje: 'Error al procesar los campos', error: error.message });
    }
};