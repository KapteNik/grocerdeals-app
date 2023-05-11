import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const SubcategoryDropdown = ({ category }) => {
    const [subcategory, setSubcategory] = React.useState('');
  
    const handleSubcategoryChange = (event) => {
      setSubcategory(event.target.value);
    };
  
    switch (category) {
      case "Drinks":
        return (
            <Grid item sx={{ minWidth: 500}}>
            <FormControl >
          <InputLabel id="subcategory-select">Yποατηγορία Προϊόντος</InputLabel>
          <Select
            labelId="subcategory-select"
            id="subcategory-select"
            value={subcategory}
            label="Subcategory"
            onChange={handleSubcategoryChange}
          >
            <MenuItem value={'Wine'}>Κρασιά</MenuItem>
            <MenuItem value={'Beer'}>Μπύρες</MenuItem>
          </Select>
        </FormControl>
            </Grid>
        );
      case "Cleaning":
        return (
           <Grid item sx={{ minWidth: 500}}>
            <FormControl >
          <InputLabel id="subcategory-select">Yποατηγορία Προϊόντος</InputLabel>
          <Select
            labelId="subcategory-select"
            id="subcategory-select"
            value={subcategory}
            label="Subcategory"
            onChange={handleSubcategoryChange}
          >
            <MenuItem value={'Cleaning'}>Είδη Γενικού Καθαρισμού</MenuItem>
            <MenuItem value={'Detergents'}>Απορρυπαντικά</MenuItem>
          </Select>
        </FormControl>
            </Grid>
        );
      case "Food":
        return (
          <Grid item sx={{ minWidth: 500}}>
            <FormControl >
          <InputLabel id="subcategory-select">Yποατηγορία Προϊόντος</InputLabel>
          <Select
            labelId="subcategory-select"
            id="subcategory-select"
            value={subcategory}
            label="Subcategory"
            onChange={handleSubcategoryChange}
          >
            <MenuItem value={'Cereals'}>Δημητριακά</MenuItem>
            <MenuItem value={'Οil'}>Λάδι</MenuItem>
          </Select>
        </FormControl>
            </Grid>
        );
        case "Personal Care":
        return (
            <Grid item sx={{ minWidth: 500}}>
            <FormControl >
          <InputLabel id="subcategory-select">Yποατηγορία Προϊόντος</InputLabel>
          <Select
            labelId="subcategory-select"
            id="subcategory-select"
            value={subcategory}
            label="Subcategory"
            onChange={handleSubcategoryChange}
          >
            <MenuItem value={'Shampoo'}>Σαμπουάν - Αφρόλουτρα</MenuItem>
            <MenuItem value={'Deodorant'}>Αποσμητικά</MenuItem>
          </Select>
        </FormControl>
            </Grid>
        );
      default:
        return null;
    }
  };

// ==================================================================================

const NewOfferFormCopy = () => {
    const [category, setCategory] = React.useState('');
      
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
  return (
    <Box sx={{ minWidth: 600, mt: 3, p:3, borderRadius: 2 }} style={{ backgroundColor: '#ffffff' }}>
        <Grid container spacing={3} 
        // direction="column"
        // justifyContent="center"
        // alignItems="flex-start"
        >
        <Grid item>
        <FormControl sx={{minWidth: 300}}>
        <InputLabel id="category-select">Κατηγορία Προϊόντος</InputLabel>
        <Select
          labelId="category-select"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value={"Drinks"}>Ποτά - Αναψυκτικά</MenuItem>
          <MenuItem value={"Cleaning"}>Καθαριότητα</MenuItem>
          <MenuItem value={"Food"}>Τρόφιμα</MenuItem>
          <MenuItem value={"Personal Care"}>Προσωπική Φροντίδα</MenuItem>
        </Select>
        </FormControl>
        </Grid>
        <SubcategoryDropdown category={category} />
        </Grid>
    </Box>
  )
}

export default NewOfferFormCopy