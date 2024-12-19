import express, { urlencoded } from 'express';
import router from './routes/paisRoutes.mjs';
import { connectDB } from './config/dbConfig.mjs';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.resolve('src','views'));
app.use(expressEjsLayouts);
app.set('layout', 'layout');
app.use(express.static(path.resolve('src','public')));

//Middleware para parsear JSON
app.use(express.json());
app.use(urlencoded({extended: true}));

connectDB();

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});