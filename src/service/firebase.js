// import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { serviceAccount } from '../clavesSDK/adminsdk.jsx';
// dotenv.config();
// const firebaseConfig = {
//     apiKey: import.meta.env.ApiKey,
//     authDomain: import.meta.env.AuthDomain,
//     projectId: import.meta.env.ProjectId,
//     storageBucket: import.meta.env.StorageBucket,
//     messagingSenderId: import.meta.env.MessagingSenderId,
//     appId: import.meta.env.AppId,
//     measurementId: import.meta.env.MeasurementId
// };
const firebaseConfig = {
    apiKey: "AIzaSyB4RrPdwk9GEJCbGIcI4dX8PRqxFvDdmFs",
    authDomain: "taller-31804.firebaseapp.com",
    databaseURL: "https://taller-31804.firebaseio.com",
    projectId: "taller-31804",
    storageBucket: "taller-31804.appspot.com",
    messagingSenderId: "1035085868157",
    appId: "1:1035085868157:web:131c9aa106340a9f51d514",
    measurementId: "G-5QRYM82YX3"
};


const app = initializeApp(firebaseConfig);
// initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
const db = getFirestore();
export { db };