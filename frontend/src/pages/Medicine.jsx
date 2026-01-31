import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, CardActions, 
  Button, TextField, InputAdornment, Chip, Box, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, [searchTerm, category, type]);

  const fetchMedicines = async () => {
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (category) params.category = category;
      if (type) params.type = type;
      
      const response = await axios.get('/api/medicines', { params });
      setMedicines(response.data);
    } catch (error) {
      setError('Failed to fetch medicines');
    }
  };

  const addToCart = (medicine) => {
    setCart([...cart, medicine]);
  };

  const categories = ['painkiller', 'antibiotic', 'antiviral', 'antifungal', 'cardiovascular'];
  const types = ['modern', 'ayurvedic'];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Medicine Store
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search medicines"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              SelectProps={{ native: true }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              SelectProps={{ native: true }}
            >
              <option value="">All Types</option>
              {types.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          Cart: {cart.length} items
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {medicines.map((medicine) => (
          <Grid item xs={12} md={6} lg={4} key={medicine._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {medicine.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {medicine.description}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Chip 
                    label={medicine.type} 
                    color={medicine.type === 'ayurvedic' ? 'success' : 'primary'} 
                    size="small" 
                  />
                  {medicine.category && (
                    <Chip label={medicine.category} variant="outlined" size="small" sx={{ ml: 1 }} />
                  )}
                </Box>
                <Typography variant="h6" color="primary">
                  ₹{medicine.price}
                </Typography>
                <Typography variant="body2">
                  Stock: {medicine.stock}
                </Typography>
                {medicine.dosage && (
                  <Typography variant="body2">
                    Dosage: {medicine.dosage}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  startIcon={<ShoppingCartIcon />}
                  variant="contained" 
                  fullWidth
                  onClick={() => addToCart(medicine)}
                  disabled={medicine.stock === 0}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {medicines.length === 0 && (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No medicines found matching your criteria.
        </Typography>
      )}
    </Container>
  );
};

export default Medicine;