import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';

export default function InventoryPage() {

  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Inventory
        </Typography>
        needs to be implemented
      </Container>
    </>
  );
}
