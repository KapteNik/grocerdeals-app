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

// ================= SUBCATEGORY DROPDOWN =======================

const SubcategoryDropdown = ({ category }) => {
  const [subcategory, setSubcategory] = React.useState('');

  const handleSubcategoryChange = (event) => {
    setSubcategory(event.target.value);
  };

  switch (category) {
    case "Drinks":
      return (
          <Grid item xs={12} sx={{ minWidth: 500}}>
          <FormControl fullWidth>
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
         <Grid item xs={12} sx={{ minWidth: 500}}>
          <FormControl fullWidth>
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
        <Grid item xs={12} sx={{ minWidth: 500}}>
          <FormControl fullWidth>
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
          <Grid item xs={12} sx={{ minWidth: 500}}>
          <FormControl fullWidth>
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

// ================= CATEGORY DROPDOWN =======================

const CategoriesDropDown = ({ action }) => {
  const [category, setCategory] = React.useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };


  switch (action) {
    case "create-product":
      return (
        <Grid container 
        spacing={1.5} 
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
          <Grid item xs={12} sx={{ minWidth: 500}}>
          <FormControl fullWidth>
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
          <Grid item xs={12} sx={{ minWidth: 500}}>
          <TextField id="outlined-basic" label="Ονομασία Προϊόντος" variant="outlined" />
          </Grid>
          <Grid item xs={12} sx={{ minWidth: 500}}>
          <TextField id="outlined-basic" label="Tιμή Προϊόντος" variant="outlined" />
        </Grid>
        </Grid>

      );
    case "update-product":
      return (
        <>
          <Grid item xs={7}>
          <TextField id="outlined-basic" label="Phone" variant="outlined" />
          </Grid>
          <Grid item xs={7}>
          <TextField id="outlined-basic" label="Address" variant="outlined" />
          </Grid>
        </>
      );
    case "delete-product":
      return (
        <>
          <Grid item xs={7}>
          <TextField id="outlined-basic" label="Company" variant="outlined" />
          </Grid>
          <Grid item xs={7}>
          <TextField id="outlined-basic" label="Job Title" variant="outlined" />
          </Grid>
        </>
      );
    default:
      return null;
  }
};

// ================= PRODUCT FORM =======================

const ProductsForm = () => {
  const [action, setAction] = React.useState('');

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 500, maxWidth: 700, mt: 3, p:3, borderRadius: 2}} style={{ backgroundColor: '#ffffff'}}>
      <Grid container spacing={3} 
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        >
        <Grid item>Διαχείριση Προϊόντων</Grid>
      
      <Grid item xs={7} sx={{ minWidth: 500}}>
      <FormControl fullWidth>
        <InputLabel id="action-select">Επιλογή Ενέργειας</InputLabel>
        <Select
          labelId="action-select"
          id="action-select"
          value={action}
          label="Action"
          onChange={handleActionChange}
        >
          <MenuItem value={"create-product"}>Δημιουργία Προϊόντος</MenuItem>
          <MenuItem value={"update-product"}>Ενημέρωση Προϊόντος</MenuItem>
          <MenuItem value={"delete-product"}>Διαγραφή Προϊόντος</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={7}>
      <CategoriesDropDown action={action} />
      </Grid>
      
      
      <Grid item xs={7}>
      <Button variant="contained">Υποβολή</Button>
      </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsForm;
