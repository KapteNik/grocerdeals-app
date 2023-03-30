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
        <>
          <Grid item xs={7}>
          <FormControl fullWidth>
        <InputLabel id="subcategory-select">Yποατηγορία Προϊόντος</InputLabel>
        <Select
          labelId="subcategory-select"
          id="subcategory-select"
          value={subcategory}
          label="Subcategory"
          onChange={handleSubcategoryChange}
        >
          <MenuItem value={1}>Κρασιά</MenuItem>
          <MenuItem value={2}>Μπύρες</MenuItem>
        </Select>
      </FormControl>
          </Grid>
        </>
      );
    case "Cleaning":
      return (
        <>
         <Grid item xs={7}>
          <FormControl fullWidth>
        <InputLabel id="subcategory-select">Yποατηγορία Προϊόντος</InputLabel>
        <Select
          labelId="subcategory-select"
          id="subcategory-select"
          value={subcategory}
          label="Subcategory"
          onChange={handleSubcategoryChange}
        >
          <MenuItem value={1}>Είδη γενικού καθαρισμού</MenuItem>
          <MenuItem value={2}>Απορρυπαντικά</MenuItem>
        </Select>
      </FormControl>
          </Grid>
        </>
      );
    case "Food":
      return (
        <>
        <Grid item xs={7}>
          <FormControl fullWidth>
        <InputLabel id="subcategory-select">Yποατηγορία Προϊόντος</InputLabel>
        <Select
          labelId="subcategory-select"
          id="subcategory-select"
          value={subcategory}
          label="Subcategory"
          onChange={handleSubcategoryChange}
        >
          <MenuItem value={1}>Δημητριακά</MenuItem>
          <MenuItem value={2}>Λάδι</MenuItem>
        </Select>
      </FormControl>
          </Grid>
        </>
      );
      case "Personal Care":
      return (
        <>
          <Grid item xs={7}>
          <FormControl fullWidth>
        <InputLabel id="subcategory-select">Yποατηγορία Προϊόντος</InputLabel>
        <Select
          labelId="subcategory-select"
          id="subcategory-select"
          value={subcategory}
          label="Subcategory"
          onChange={handleSubcategoryChange}
        >
          <MenuItem value={1}>Σαμπουάν - Αφρόλουτρα</MenuItem>
          <MenuItem value={2}>Αποσμητικά</MenuItem>
        </Select>
      </FormControl>
          </Grid>
        </>
      );
    default:
      return null;
  }
};

const CategoriesDropDown = ({ action }) => {
  const [category, setCategory] = React.useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };


  switch (action) {
    case "create-offer":
      return (
        <>
          <Grid item xs={7}>
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
          <MenuItem value={"Personal Care"}>Προσωπική φροντίδα</MenuItem>
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={7}>
          <SubcategoryDropdown category={category} />
          </Grid>
        </>
      );
    case "update-offer":
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
    case "delete-offer":
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


const ProductsForm = () => {
  const [action, setAction] = React.useState('');

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  return (
    <div>
    <Card sx={{ minWidth: 500, maxWidth: 700}}>
      <CardContent>
      <Grid container spacing={3} 
        direction="column"
        justifyContent="center"
        // alignItems="center"
        >
      <Grid item xs={7}>
      <FormControl fullWidth>
        <InputLabel id="action-select">Επιλογή Ενέργειας</InputLabel>
        <Select
          labelId="action-select"
          id="action-select"
          value={action}
          label="Action"
          onChange={handleActionChange}
        >
          <MenuItem value={"create-offer"}>Δημιουργία Προσφοράς</MenuItem>
          <MenuItem value={"update-offer"}>Ενημέρωση Προσφοράς</MenuItem>
          <MenuItem value={"delete-offer"}>Διαγραφή Προσφοράς</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <CategoriesDropDown action={action} />
      </Grid>
      </CardContent>
      <CardActions>
      <Button variant="contained">Contained</Button>
      </CardActions>
    </Card>
    </div>
  );
};

export default ProductsForm;
