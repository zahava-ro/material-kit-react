import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import SvgColor from '../components/svg-color';
// sections
import { AppTasks, AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary, AppConversionRates } from '../sections/@dashboard/app';
import AppointmentsCalendar from '../components/AppointmentsCalendar/AppointmentsCalendar'
// import logo from '../../public/assets/images/avatars/high-rock-logo-transparent.png';

// ----------------------------------------------------------------------
const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const customerCount = 53;
const employeeCount = 45;
const scheduledAppointments = 43;

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        {/* <img src={logo} alt="High Rock Pest Solutions" style={{ maxWidth: '200px', marginBottom: '20px' }} /> */}
        <Typography variant="h4" sx={{ mb: 5 }}>High Rock Pest Solutions</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="../customers">
              <AppWidgetSummary title="Customers" total={customerCount}  icon={'ant-design:bug-filled'}  /> {/* icon={icon('ic_user')} */}
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Link to="../employees">
              <AppWidgetSummary title="Employees" total={employeeCount} color="info"icon={'ant-design:bug-filled'} />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Link to="../appointments">
            <AppWidgetSummary title="Scheduled Appointments" total={scheduledAppointments} color="warning" icon={'ant-design:bug-filled'} />
          </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Link to="../materials">
            <AppWidgetSummary title="Materials Out of Stock" total={2} color="error" icon={'ant-design:bug-filled'} />
          </Link>
          </Grid>

          <Grid item xs={16} md={10} lg={20}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}><br/><br/>Today's Schedule<br/></Typography>
            <AppointmentsCalendar defaultView="day" />
          </div>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Order Chemical X' },
                { id: '2', label: 'Follow up with Customer #19738 about Mouse Traps' },
                { id: '3', label: 'Interview New Employee' },
                { id: '4', label: 'Send invoive to Customer #99877' },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Service Calls"
              subheader="(+43%) than last year"
              chartLabels={['01/01/2003','02/01/2003','03/01/2003','04/01/2003','05/01/2003','06/01/2003','07/01/2003','08/01/2003','09/01/2003','10/01/2003','11/01/2003',]}
              chartData={[
                {name: 'Mice',type: 'column',fill: 'solid',data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],},
                {name: 'Bees',type: 'area',fill: 'gradient',data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],},
                {name: 'Birds',type: 'line',fill: 'solid',data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],},
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Customer Base"
              chartData={[
                { label: 'Inactive', value: 4344 },
                { label: 'Active', value: 5435 },
                { label: 'Archived', value: 1443 },
                { label: 'Prospective', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Services Offered"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Ladybugs', value: 400 },
                { label: 'Bedbugs', value: 430 },
                { label: 'Termites', value: 448 },
                { label: 'Spiders', value: 470 },
                { label: 'Rats', value: 540 },
                { label: 'Squirrels', value: 580 },
                { label: 'Birds', value: 690 },
                { label: 'Wasps', value: 1100 },
                { label: 'Bees', value: 1200 },
                { label: 'Mice', value: 1380 },
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
