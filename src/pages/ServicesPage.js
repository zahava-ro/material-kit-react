import { Helmet } from 'react-helmet-async';
// @mui
import { Stack, Button, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';

export default function ServicesPage() {

  return (
    <>
      <Helmet>
        <title> Services </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Services
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Service
          </Button>
        </Stack>
        needs to be implemented
      </Container>
    </>
  );
}
