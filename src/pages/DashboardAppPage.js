// Dashboard Page (Home Page)
// src\pages\DashboardAppPage.js
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { AppTasks, AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary, AppConversionRates } from '../sections/@dashboard/app';
import AppointmentsCalendar from '../components/AppointmentsCalendar/AppointmentsCalendar'
import { fetchAllFromTable } from '../utils/databaseOperations';

export default function DashboardAppPage() {
 
  const [services, setServices] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const theme = useTheme();
  const loggedInUser = 'Zahava'; // for tasks list 'assigned to me'
  
  useEffect(() => { (async () => {
    // Load customer data from the database here and set it to the state
    let dataFromDB = await fetchAllFromTable('service');
    setServices(dataFromDB);
    dataFromDB = await fetchAllFromTable('tasks');
    setTasks(dataFromDB);
    dataFromDB = await fetchAllFromTable('appointment');
    setAppointments(dataFromDB);
    dataFromDB = await fetchAllFromTable('customer');
    setCustomers(dataFromDB);
  })() }, []);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const servicesStats = services.map((service) => ({
    label: service.service_name,
    value: getRandomNumber(400, 1300),
  }));

  const unfinishedTasks = tasks
  .filter((task) => task.date_completed === null)
  .map((task) => ({
    id: task.item_number,
    label: task.note,
  }));

  const myTasks = tasks
  .filter((task) => task.assigned_to === loggedInUser && task.date_completed === null)
  .map((task) => ({
    id: task.item_number,
    label: task.note,
  }));

  const scheduledAppointments = appointments.filter((appointment) => appointment.completion_status === 'Scheduled' || appointment.completion_status === 'Rescheduled');
  const unpaidInvoices = appointments.filter((appointment) => appointment.payment_status === 'Unpaid' || appointment.payment_status === 'Billed');

  return (
    <>
      <Helmet><title> High Rock Dashboard </title></Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>High Rock Pest Solutions</Typography>
        <Grid item xs={12} md={6} lg={8}>
          <AppTasks
            title="Assigned to Me"
            list={myTasks}
          />
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="../customers">
              <AppWidgetSummary title="Customers" total={customers.length} icon={'ant-design:bug-filled'}  />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Link to="../services">
              <AppWidgetSummary title="Services Offered" total={services.length} color="info" icon={'ant-design:bug-filled'} />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Link to="../appointments">
            <AppWidgetSummary title="Scheduled Appointments" total={scheduledAppointments.length} color="warning" icon={'ant-design:bug-filled'} />
          </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Link to="../appointments">
            <AppWidgetSummary title="Unpaid Invoices" total={unpaidInvoices.length} color="error" icon={'ant-design:bug-filled'} />
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
              title="Unfinished Tasks"
              list={unfinishedTasks}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Service Calls"
              subheader="(+43%) than last year"
              chartLabels={['01/01/2003','02/01/2003','03/01/2003','04/01/2003','05/01/2003','06/01/2003','07/01/2003','08/01/2003','09/01/2003','10/01/2003','11/01/2003',]}
              chartData={[
                {name: 'Followup Appointments',type: 'column',fill: 'solid',data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],},
                {name: 'One-time Appointments',type: 'area',fill: 'gradient',data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],},
                {name: 'Routine Appointments',type: 'line',fill: 'solid',data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],},
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Customer Base"
              chartData={[
                { label: 'Inactive', value: 13 },
                { label: 'Active', value: 54 },
                { label: 'Archived', value: 3 },
              ]}
              chartColors={[
                theme.palette.error.main,
                theme.palette.primary.main,
                theme.palette.warning.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Services Offered"
              subheader="(+43%) than last year"
              chartData={servicesStats}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
