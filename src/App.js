/* eslint-disable react/jsx-filename-extension */
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import theme from "assets/theme";
import routes from "./routes/routes";
import { useSoftUIController } from "context";
import Footer from "examples/Footer";

export default function App() {
  const [controller] = useSoftUIController();
  const { layout, sidenavColor } = controller;
  return (
    <ThemeProvider theme={theme}>
      {layout === "dashboard" && (<Sidenav color={sidenavColor} brandName="Dev Notes C.M" routes={routes} />)}
      <CssBaseline />
      <DashboardLayout>
        <DashboardNavbar />
        <Outlet />
        <Footer />
      </DashboardLayout>
    </ThemeProvider>
  );
}
