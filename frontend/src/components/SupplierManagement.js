import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupplierForm from './SupplierForm';
import SupplierList from './SupplierList';
import { TextField, Button, Box, Typography } from '@mui/material';

const SupplierManagement = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/suppliers');
            setSuppliers(response.data);
            setFilteredSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const handleSupplierAdded = (newSupplier) => {
        const updatedSuppliers = [...suppliers, newSupplier];
        setSuppliers(updatedSuppliers);
        setFilteredSuppliers(updatedSuppliers);
    };

    const handleDeleteSupplier = async (deletedSupplierId) => {
        try {
            await axios.delete(`http://localhost:8080/suppliers/${deletedSupplierId}`);
            const updatedSuppliers = suppliers.filter((supplier) => supplier.id !== deletedSupplierId);
            setSuppliers(updatedSuppliers);
            setFilteredSuppliers(updatedSuppliers);
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    };

    const handleUpdateSupplier = () => {
        fetchSuppliers();
    };

    const handleSearch = () => {
        const filtered = suppliers.filter(supplier =>
            supplier.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSuppliers(filtered);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Supplier Management
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <TextField
                    label="Search Suppliers"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flex: 1, mr: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleSearch} sx={{ minWidth: 'unset' }}>
                    Search
                </Button>
            </Box>
            <SupplierForm onSupplierAdded={handleSupplierAdded} />
            <SupplierList
                suppliers={filteredSuppliers}
                onUpdateSupplier={handleUpdateSupplier}
                onDeleteSupplier={handleDeleteSupplier}
            />
        </Box>
    );
};

export default SupplierManagement;
