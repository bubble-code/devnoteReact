/* eslint-disable react/jsx-filename-extension */
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import { useSoftUIController } from '../../context';
// import FormAddBilling from "components/FormAddBilling";
import FormAddBilling from "../../components/FormAddBilling";

// Soft UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

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
  useEffect(() => {
    DataService.listAgencias().then((response) => {
      response.forEach((element) => {
        console.log(element.id);
      });
    });
  }, []);

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
                  {(() => {
                    switch (listBilling) {
                      case 0:
                        return <ViewTable py={2} mb={2} headTitle={"Hola"} />
                      default:
                        return <FormAddBilling py={2} mb={2} headTitle={"Billing Invoice"} />
                    }
                  })()
                  }
                </Grid>
                <Grid item xs={12}>
                  <TableBillingService py={0} mb={2} headTitle={"Billing Service"} />
                </Grid>
                {/*<Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="paypal"
                    description="Freelance Payment"
                    value="$455.00"
                  />
                </Grid>
                {/* ///////////// */}
              </Grid>
            </Grid>
            {/* ///////////// */}
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </SoftBox>
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
