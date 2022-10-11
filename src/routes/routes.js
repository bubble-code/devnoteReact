/* eslint-disable react/jsx-filename-extension */
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import ClientContainer from "layouts/client/Cliente";
import AdminLayout from "layouts/admin/admin"

// Soft UI Dashboard React icons
import Office from "examples/Icons/Office";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";

const routes = [
  {
    name: "Home",
    type: "collapse",
    key: "home",
    route: "/home",
    icon: <Office size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    name: "Notes",
    type: "collapse",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "title",
    title: "Config Pages",
    key: "config-pages"
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Client",
    key: "client",
    route: "/client",
    icon: <CustomerSupport size="12px" />,
    component: <ClientContainer />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admin",
    key: "admin",
    route: "/admin",
    icon: <CustomerSupport size="12px" />,
    component: <AdminLayout />,
    noCollapse: true,
  }
];

export default routes;
