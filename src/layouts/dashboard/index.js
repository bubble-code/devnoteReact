/* eslint-disable react/jsx-filename-extension */
import { useEffect, useState } from "react";
import DataService from '../../service/services';
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "../../examples/Cards/StatisticsCards/MiniStatisticsCard/index";
import typography from "assets/theme/base/typography";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import { Fragment } from "react";

function Dashboard() {
  const [cm, setCm] = useState([]);
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  const getData = async () => {
    const res = [];
    const response = await DataService.listCM();
    response.forEach((element) => {
      // console.log(element.id);
      res.push(
        <Grid item xs={12} sm={6} xl={3}>
          <MiniStatisticsCard
            title={{ text: `${element.id}`, color: "white" }}
            count="0"
            percentage={{ color: "#82d616", text: "100%" }}
            icon={{ color: "info", component: "man" }}
            bgColor={'#344767'}
          />
        </Grid>
      );
    }
    );
    setCm(res)
  }
  useEffect(() => {
    getData()
  }, [])


  return (
    <Fragment>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {[...cm]}
          </Grid>
        </SoftBox>
        {/*  <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox>
       <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
              </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>*/}
      </SoftBox>
      <Footer />
    </Fragment>
  );
}

export default Dashboard;
