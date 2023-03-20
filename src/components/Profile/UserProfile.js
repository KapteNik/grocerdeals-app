import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import React from 'react';
import PurchaseHistoryTable from './PurchaseHistoryTable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


const UserProfile = () => {
  return (
    <Box sx={{ width: '100%',  mt: 8}}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
        </Grid>
        <Grid container spacing={10} bgcolor green>
          <Grid item xs={12}>
            <ProfileForm />
          </Grid>
           <Grid item xs={12}>
            <ProfileForm />
          </Grid>
          <Grid item xs={12}>
            <PurchaseHistoryTable/>
          </Grid>
          <Grid item xs={12}>
            <PurchaseHistoryTable/>
          </Grid>
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
       {/* <Grid 
        container
        spacing={5}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <ProfileForm />
          </Grid>
           <Grid item xs={12}>
            <ProfileForm />
          </Grid>
          <Grid item xs={12}>
            <PurchaseHistoryTable/>
          </Grid>
          <Grid item xs={12}>
            <PurchaseHistoryTable/>
          </Grid>
      </Grid> */}

    </Box>
  );
};

export default UserProfile;

