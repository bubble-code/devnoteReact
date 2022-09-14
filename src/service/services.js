import { db } from "./firebase";
import { collection, getDoc, getDocs, onSnapshot, doc, query, addDoc, setDoc, deleteDoc, updateDoc, where } from 'firebase/firestore'


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
    _pathCM = "/CM/cm/cm";
    // _pathJobs = "jobs";


    // **********************************Add a new machine to hall****************************************************
    // async addMachine({ comunidad, salon, data }) {
    //     const { plaza, noMaquina, permiso, denominacion, observacion } = data;
    //     const collectionn = doc(db, `${this._pathComunidades}/${comunidad}/Salones/${salon}/Maquinas`, plaza);
    //     await setDoc(collectionn, { noMaquina, permiso, denominacion, observacion });
    // }

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
    async listActivedClients({ cm }) {
        const collectionn = collection(db, `${this._pathCM}/${cm}/activeClient`);
        const querySnapShot = query(collectionn);
        const result = await getDocs(querySnapShot)
        return result.docs;
    }
    async listBillingOpenByCm({ cm, day = 0 }) {
        const collectionn = day ? collection(db, `${this._pathCM}/${cm}/openBilling/${day}/1`) : collection(db, `${this._pathCM}/${cm}/openBilling`);
        const querySnapShot = query(collectionn, where("status", "==", "open"));
        // console.log(collectionn.id);
        const result = await getDocs(querySnapShot)
        return result.docs;
    }
    async listNoteByClient({ cm, name }) {
        const collectionn = collection(db, `${this._pathCM}/${cm}/openBilling`);
        const querySnapShot = query(collectionn, where('status', '==', 'completed'), where("cn", "==", `${name}`));
        const result = await getDocs(querySnapShot)
        return result.docs;
    }
    // **********************************Billings****************************************************
    async getServiceById({ cm, id }) {
        const docRef = doc(db, `${this._pathCM}/${cm}/openBilling/`, `${id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { ...docSnap.data(), id: docSnap.id };
        } else {
            // doc.data() will be undefined in this case
            console.log("Document with id: ", id, " does not exist!");
        }
    }
    async updateSerNote({ cm, id, data }) {
        const docRef = doc(db, `${this._pathCM}/${cm}/openBilling/`, `${id}`);
        await updateDoc(docRef, data);
    }



    async listBilling({ cm }) {
        const billingsOpen = await this.listBillingOpenByCm({ cm });
        const response = [];
        return Promise.all(billingsOpen.map(async (item) => {
            return await this.listBillingOpenByCm({ cm, day: item.id });
        })).then((result) => {
            result.forEach((item) => {
                item.forEach((item2) => {
                    response.push(item2.data());
                })
            });
            return response;
        }
        );
    }


    async totalUnits({ cm, day }) {
        let total = 0;
        try {
            const conllectionn = collection(db, `${this._pathCM}/${cm}/openBilling/${day}/1`);
            const querySnapShot = query(conllectionn);
            const result = await getDocs(querySnapShot);
            result.docs.forEach((item) => {
                total += item.data().u;
                // console.log(total)
            })
        } catch (error) {
            console.log(error);
        }
        return total;
    }



    async createBilling({ data }) {
        const { cm } = data;
        try {
            // console.log(cm)
            const collectionn = collection(db, `${this._pathCM}/${cm}/openBilling`);
            await addDoc(collectionn, { ...data });
            // await setDoc(collectionn, { u, c, p, t, d, f, e });

        } catch (error) {
            console.log(error);
        }
    }
    // **********************************Lists****************************************************

}


export default new DataService();