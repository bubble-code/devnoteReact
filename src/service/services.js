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
    _pathDxCode = "/dxCode";
    _pathService = "/typeServices";

    // ********************************** LIST ****************************************************
    // #region LIST
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
        return result.docs.map((item) => ({ label: item.id, pNumber: item.data()['pNumber'], sCode: item.data()['sCode'] }));
    }
    async lisService() {
        const collectionn = collection(db, `${this._pathService}`);
        const querySnapShot = query(collectionn);
        const result = await getDocs(querySnapShot)
        return result.docs.map((item) => ({ label: item.data()['serviceDesx'] }));
    }


    //#endregion

    // ********************************** CRUD Billings****************************************************
    // #region CRUD Billings
    async createBilling({ data }) {
        const { cm } = data;
        try {
            const collectionn = collection(db, `${this._pathCM}/${cm}/openBilling`);
            await addDoc(collectionn, { ...data });
            return true;
        } catch (error) {
            console.log(error);
        }
    }
    async updateSerNote({ cm, id, data }) {
        const docRef = doc(db, `${this._pathCM}/${cm}/openBilling/`, `${id}`);
        await updateDoc(docRef, data);
    }

    async deleteService({ cm, id }) {
        const docRef = doc(db, `${this._pathCM}/${cm}/openBilling/`, `${id}`);
        await deleteDoc(docRef);
    }

    async updateService({ cm, id, data }) {
        const docRef = doc(db, `${this._pathCM}/${cm}/openBilling/`, `${id}`);
        await updateDoc(docRef, data);
    }

    async addNewClient({ cm, data }) {
        const { name, lastName } = data;
        const docRef = doc(db, `${this._pathCM}/${cm}/activeClient/`, `${name} ${lastName}`);
        await setDoc(docRef, data);
    }
    async addNewDxCode({ dxData }) {
        try {
            const { dxCode, dxDesx } = dxData;
            const dxDescription = dxDesx.trim();
            const docRef = doc(db, `${this._pathDxCode}`, `${dxCode}`);
            await setDoc(docRef, { dxCode, dxDescription });
            return true;

        } catch (error) {
            console.log('addNewDxCode', error);
            return false;
        }
    }

    async addNewService({ serviceDx }) {
        try {
            const { serviceDesx } = serviceDx;
            const collRef = collection(db, `${this._pathService}`);
            await addDoc(collRef, { serviceDesx });
            return true;

        } catch (error) {
            console.log('addNewService', error);
            return false;
        }
    }

    // #endregion


    // ********************************** GETS ****************************************************
    // #region GETS
    async getServiceById({ cm, id }) {
        if (id) {
            const docRef = doc(db, `${this._pathCM}/${cm}/openBilling/`, `${id}`);
            const docSnap = await getDoc(docRef);
            // console.log(docSnap.data());
            if (docSnap.exists()) {
                return { ...docSnap.data(), id: docSnap.id };
            } else {
                // doc.data() will be undefined in this case
                console.log("Document with id: ", id, " does not exist!");
            }
        } else {
            return {}
        }
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

    async listClient({ cm }) {
        const collectionn = collection(db, `${this._pathCM}/${cm}/activeClient`);
        const querySnapShot = query(collectionn);
        const result = await getDocs(querySnapShot)
        return result.docs.map((item) => {
            // const { name, lastName } = item.data();
            return { label: item.id, ...item.data() }
        });
    }
    // { id: item.id, label: item.data()['serviceDesx'], ...item.data() }

    async listActivedClients({ cm }) {
        const collectionn = collection(db, `${this._pathCM}/${cm}/activeClient`);
        const querySnapShot = query(collectionn);
        const result = await getDocs(querySnapShot)
        return result.docs;
    }
    async listBillingOpenByCm({ cm }) {
        if (cm) {
            const collectionn = collection(db, `${this._pathCM}/${cm}/openBilling`);
            const querySnapShot = query(collectionn, where("status", "==", "open"));
            const result = await getDocs(querySnapShot)
            // console.log(result.docs);
            return result.docs;
        }
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
    async listNoteByClient({ cm, name }) {
        // console.log(name);
        const collectionn = collection(db, `${this._pathCM}/${cm}/openBilling`);
        const querySnapShot = query(collectionn, where('status', '==', 'completed'), where("cn", "==", `${name}`));
        const result = await getDocs(querySnapShot)
        return result.docs;
    }
    // #endregion 

    // **********************************Lists****************************************************
    // #region Search


    async searchHelper({ value }) {
        // console.log("value", value);
        const resultFinal = [];
        const listCMa = await this.listCM();
        // console.log(listCMa);
        const prevResult = Promise.allSettled(listCMa.map(async (item) => {
            console.log("item.id", item.label);
            const collectionn = collection(db, `${this._pathCM}/${item.label}/openBilling`);
            const querySnapShot = query(collectionn, where('status', '==', 'completed'));
            const result = await getDocs(querySnapShot);
            return result.docs;
        })
        ).then((result) => {
            result.forEach((item2) => {
                console.log("result", item2);
                if (item2.status === "fulfilled") {
                    // resultFinal.push(
                    item2.value.map((item) => {
                        Object.values(item.data().description).forEach((item3) => {
                            // console.log(item3);
                            if (item3.toLowerCase().includes(value.toLowerCase())) {
                                resultFinal.push(item.data());
                            }
                        });
                    })
                }
            });
            // console.log("resultFinal", resultFinal);
            return resultFinal;
        }).catch((error) => {
            console.log(error);
            return [];
        });
        // console.log("Result Final", prevResult);
        return prevResult;
    }

    // #endregion


}


export default new DataService();