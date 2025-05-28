import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Paths
export const staticPath = path.resolve(__dirname, '../static');
export const modelPath = path.resolve(__dirname, '../model');
export const servicePath = path.resolve(__dirname, '../service');
