import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import ProductsForm from '../components/Admin/ProductsForm';
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


const AdminPage = () => {
    const authCtx = useContext(AuthContext);
    return ( 
      <Box sx={{ width: '100%',  mt: 5, mb:  6}} style={{ backgroundColor: '#f0f0f0' }}>
      <Grid container spacing={5} 
        direction="column"
        justifyContent="center"
        alignItems="center">
      <Grid item xs={12}>
        <ProductsForm />
      </Grid>
      <Grid item xs={12}>
        {/* <ChangePasswordForm /> */}
      </Grid>
      <Grid item xs={12}>
        {/* <PurchaseHistoryTable/> */}
      </Grid>
      <Grid item xs={12}>
            {/* <LikeHistoryTable/> */}
          </Grid>
      </Grid>
    </Box>
      );
  };
  
  export default AdminPage;
  