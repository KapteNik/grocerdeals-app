import ProfileForm from './ChangePasswordForm';
import React from 'react';
import PurchaseHistoryTable from './PurchaseHistoryTable';
import ChangePasswordForm from './ChangePasswordForm'
import ChangeUsernameForm from './ChangeUsernameForm'
import LikeHistoryTable from './LikeHistoryTable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


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
    <Box sx={{ width: '100%',  mt: 5, mb:  6}} style={{ backgroundColor: '#f0f0f0' }}>
      <Grid container spacing={5}>
          <Grid item xs={12}>
            <ChangeUsernameForm />
          </Grid>
           <Grid item xs={12}>
            <ChangePasswordForm />
          </Grid>
          <Grid item xs={12}>
            <PurchaseHistoryTable/>
          </Grid>
          <Grid item xs={12}>
            <LikeHistoryTable/>
          </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;

