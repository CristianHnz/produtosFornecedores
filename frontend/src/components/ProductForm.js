import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Box, Typography
} from '@mui/material';

const ProductForm = ({ onProductAdded }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        supplier: null,
    });
    const [suppliers, setSuppliers] = useState([]);
    const [errors, setErrors] = useState({
        name: '',
        price: '',
        stockQuantity: '',
        supplier: '',
    });

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'supplierId') {
            const selectedSupplier = suppliers.find(supplier => supplier.id === parseInt(value));
            setProduct({ ...product, supplier: selectedSupplier });
        } else {
            setProduct({ ...product, [name]: value });
        }
        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                errorMessage = value.trim() ? '' : 'Product name is required';
                break;
            case 'price':
                errorMessage = value > 0 ? '' : 'Price must be greater than 0';
                break;
            case 'stockQuantity':
                errorMessage = value >= 0 ? '' : 'Stock quantity must be 0 or greater';
                break;
            case 'supplierId':
                errorMessage = value ? '' : 'Supplier is required';
                break;
            default:
                break;
        }

        setErrors({ ...errors, [fieldName]: errorMessage });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, price, stockQuantity, supplier } = product;
        validateField('name', name);
        validateField('price', price);
        validateField('stockQuantity', stockQuantity);
        validateField('supplierId', supplier?.id);

        if (Object.values(errors).some((error) => error)) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/products', product);
            onProductAdded(response.data);
            setProduct({
                name: '',
                description: '',
                price: '',
                stockQuantity: '',
                supplier: null,
            });
            setErrors({
                name: '',
                price: '',
                stockQuantity: '',
                supplier: '',
            });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>Add Product</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Product Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="stockQuantity"
                    label="Stock Quantity"
                    name="stockQuantity"
                    type="number"
                    value={product.stockQuantity}
                    onChange={handleChange}
                    error={!!errors.stockQuantity}
                    helperText={errors.stockQuantity}
                />
                <FormControl variant="outlined" fullWidth margin="normal" required error={!!errors.supplier}>
                    <InputLabel id="supplier-label">Supplier</InputLabel>
                    <Select
                        labelId="supplier-label"
                        id="supplier"
                        name="supplierId"
                        value={product.supplier?.id || ''}
                        onChange={handleChange}
                        label="Supplier"
                    >
                        <MenuItem value="">
                            <em>Select Supplier</em>
                        </MenuItem>
                        {suppliers.map((supplier) => (
                            <MenuItem key={supplier.id} value={supplier.id}>
                                {supplier.description}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.supplier && <FormHelperText>{errors.supplier}</FormHelperText>}
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Add Product
                </Button>
            </form>
        </Box>
    );
};

export default ProductForm;
