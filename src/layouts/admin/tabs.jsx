import React from "react";
import ClientAdmin from "./compoonents/ClientAdmin";


export default function tabs() {
    return [
        { label: "Clients", component: <ClientAdmin /> },
        { label: "Case Managers", component: <h1>Case Managers</h1> },
        { label: "Billing", component: <h1>Billing</h1> },

    ]
}

