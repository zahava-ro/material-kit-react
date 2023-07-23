import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// mock
import PRODUCTS from '../_mock/products';

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
