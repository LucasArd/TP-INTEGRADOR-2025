import ejs from 'ejs';
import PATHS from '../../paths/paths.js';

export async function dashboard(req, res) {
    let html = await ejs.renderFile(PATHS.dashboardView);
    res.status(200).send(html);
}

export async function viewAlta(req,res){
    let html = await ejs.renderFile(PATHS.altaView, { abm:'A' });
    res.status(200).send(html);
}

export async function viewBaja(req,res){
    let html = await ejs.renderFile(PATHS.dashboardView, { abm:'B' });
    res.status(200).send(html);
}

export async function viewMod(req,res){
    let html = await ejs.renderFile(PATHS.dashboardView, { abm:'M' });
    res.status(200).send(html);
}
