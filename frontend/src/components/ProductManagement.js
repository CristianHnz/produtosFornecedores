import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { TextField, Button, Box, Typography } from '@mui/material';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [supplierSearchTerm, setSupplierSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products');
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const handleProductAdded = (newProduct) => {
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
    };

    const handleDeleteProduct = async (deletedProductId) => {
        try {
            await axios.delete(`http://localhost:8080/products/${deletedProductId}`);
            const updatedProducts = products.filter((product) => product.id !== deletedProductId);
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdateProduct = () => {
        fetchProducts();
    };

    const handleSearch = () => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!supplierSearchTerm || product.supplierId === parseInt(supplierSearchTerm))
        );
        setFilteredProducts(filtered);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Product Management
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <TextField
                    label="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flex: 1, mr: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleSearch} sx={{ height: '100%' }}>
                    Search
                </Button>
            </Box>
            <ProductForm suppliers={suppliers} onProductAdded={handleProductAdded} />
            <ProductList
                products={filteredProducts}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProduct={handleUpdateProduct}
            />
        </Box>
    );
};

export default ProductManagement;
