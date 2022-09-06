import { db } from "./firebase";
import { collection, getDoc, getDocs, onSnapshot, doc, query, where, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'

class DataService {
    // _collectionName = "Checklist";
    // _pathSalones = "salones/Madrid/Salones";
    // _pathTipoAverias = "salones/Madrid/TiposAverias";
    // _pathAverias = "salones/Madrid/Averias";
    // _pathAveriasCerradas = "salones/Madrid/AveriasCerradas";
    // _pathIsInicioTec = "salones/Madrid/Tecnicos";
    _pathComunidades = "/salones";
    _collectionAgencias = "/CM/agencias/listagencias";
    _collectionCM = "/CM/cm/cm";
    // _pathJobs = "jobs";


    // **********************************Add a new machine to hall****************************************************
    async addMachine({ comunidad, salon, data }) {
        const { plaza, noMaquina, permiso, denominacion, observacion } = data;
        const collectionn = doc(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Maquinas`, plaza);
        await setDoc(collectionn, { noMaquina, permiso, denominacion, observacion });
    }

    async listAgencias() {
        const collectionn = collection(db, `${this._collectionAgencias}`);
        const querySnapShot = query(collectionn);
        const result = await getDocs(querySnapShot)
        return result.docs;
    }
    async listCM() {
        const collectionn = collection(db, `${this._collectionCM}`);
        const querySnapShot = query(collectionn);
        const result = await getDocs(querySnapShot)
        return result.docs;
    }
}


export default new DataService();