import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import NewOfferForm from '../components/Products/NewOfferForm';

const NewOfferPage = () => {
    return ( 
      <Box sx={{ width: '100%',  mt: 5, pb: 10}} style={{ backgroundColor: '#f0f0f0' }}>
      <Grid container spacing={5} 
        direction="column"
        justifyContent="center"
        alignItems="center">
      <Grid item xs={12}>
        <NewOfferForm />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained">Επιστροφή στον Χάρτη</Button>
      </Grid>
      </Grid>
    </Box>
      );
  };
  
  export default NewOfferPage;