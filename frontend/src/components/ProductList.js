import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography
} from '@mui/material';

const ProductList = ({ products, onDeleteProduct, onUpdateProduct }) => {
    const [editMode, setEditMode] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        id: null, name: '', description: '', price: '', stockQuantity: '', supplier: null
    });

    const handleEdit = (product) => {
        setEditMode(product.id);
        setEditedProduct({ ...product, supplier: product.supplier });
    };

    const cancelEdit = () => {
        setEditMode(null);
        setEditedProduct({ id: null, name: '', description: '', price: '', stockQuantity: '', supplier: null });
    };

    const saveEdit = async () => {
        try {
            const { id, name, description, price, stockQuantity, supplier } = editedProduct;
            await axios.put(`http://localhost:8080/products/${id}`, {
                id, name, description, price, stockQuantity, supplier
            });
            setEditMode(null);
            setEditedProduct({ id: null, name: '', description: '', price: '', stockQuantity: '', supplier: null });
            onUpdateProduct();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>Product List</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock Quantity</TableCell>
                            <TableCell>Supplier</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                {editMode === product.id ? (
                                    <>
                                        <TableCell>
                                            <TextField
                                                name="name"
                                                value={editedProduct.name}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name="description"
                                                value={editedProduct.description}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name="price"
                                                value={editedProduct.price}
                                                onChange={handleChange}
                                                type="number"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name="stockQuantity"
                                                value={editedProduct.stockQuantity}
                                                onChange={handleChange}
                                                type="number"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name="supplierId"
                                                value={editedProduct.supplier?.id || ''}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={saveEdit} variant="contained" color="primary" sx={{ mr: 1 }}>
                                                Save
                                            </Button>
                                            <Button onClick={cancelEdit} variant="contained" color="secondary">
                                                Cancel
                                            </Button>
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.stockQuantity}</TableCell>
                                        <TableCell>{product.supplier?.description}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleEdit(product)} variant="contained" color="primary" sx={{ mr: 1 }}>
                                                Edit
                                            </Button>
                                            <Button onClick={() => onDeleteProduct(product.id)} variant="contained" color="secondary">
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProductList;
