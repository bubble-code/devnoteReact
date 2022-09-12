/* eslint-disable react/jsx-filename-extension */
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import { useSoftUIController, setLoadListCm } from '../../context';
import { useFetch } from "../../service/fetchHoo";
// import FormAddBilling from "components/FormAddBilling";
import FormAddBilling from "../../components/FormAddBilling";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import AddBillingForm from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import ViewTable from "../../components/Table";
import DataService from '../../service/services'
import TableBillingService from "components/TableBillingService";

function Billing() {
  const [context, dispatch] = useSoftUIController();
  const { listBilling } = context;
  const { data, loading, error } = useFetch();

  useEffect(() => {
    setLoadListCm(dispatch, data);
  }, [data, dispatch]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={2}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <AddBillingForm />
                </Grid>
                <Grid item xs={12}>
                <FormAddBilling py={2} mb={2} headTitle={"Billing Invoice"} />
                  {/*(() => {
                    switch (listBilling) {
                      case 0:
                        return <FormAddBilling py={2} mb={2} headTitle={"Billing Invoice"} />
                      default:
                        return <ViewTable py={2} mb={2} headTitle={"Hola"} />
                    }
                  })()
                */}
                </Grid>
              </Grid>
            </Grid>
            {/* ///////////// */}
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableBillingService py={0} mb={2} headTitle={"Billing Service"} />
          </Grid>
        </Grid>
        <SoftBox my={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
