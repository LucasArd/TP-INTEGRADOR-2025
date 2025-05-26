import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppEjs = path.resolve(__dirname, '../controllers/controllersView/AppEjs.js');
export const AppEstatico = path.resolve(__dirname, '../controllers/controllersView/AppEstatico.js');
