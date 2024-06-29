import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box
} from '@mui/material';

const SupplierList = ({ suppliers, onDeleteSupplier, onUpdateSupplier }) => {
    const [editMode, setEditMode] = useState(null);
    const [editedSupplier, setEditedSupplier] = useState({ id: null, description: '', adress: '', phone: '', email: '', cnpj: '' });

    const handleEdit = (supplier) => {
        setEditMode(supplier.id);
        setEditedSupplier({ ...supplier });
    };

    const cancelEdit = () => {
        setEditMode(null);
        setEditedSupplier({ id: null, description: '', adress: '', phone: '', email: '', cnpj: '' });
    };

    const saveEdit = async () => {
        try {
            const { id, description, adress, phone, email, cnpj } = editedSupplier;
            await axios.put(`http://localhost:8080/suppliers/${id}`, { id, description, adress, phone, email, cnpj });
            setEditMode(null);
            setEditedSupplier({ id: null, description: '', adress: '', phone: '', email: '', cnpj: '' });
            onUpdateSupplier();
        } catch (error) {
            console.error('Error updating supplier:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedSupplier({ ...editedSupplier, [name]: value });
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>Adress</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>CNPJ</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                            {editMode === supplier.id ? (
                                <>
                                    <TableCell>
                                        <TextField
                                            name="description"
                                            value={editedSupplier.description}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="adress"
                                            value={editedSupplier.adress}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="phone"
                                            value={editedSupplier.phone}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="email"
                                            value={editedSupplier.email}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="cnpj"
                                            value={editedSupplier.cnpj}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Button onClick={saveEdit} variant="contained" color="primary">
                                                Save
                                            </Button>
                                            <Button onClick={cancelEdit} variant="contained" color="secondary">
                                                Cancel
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>{supplier.description}</TableCell>
                                    <TableCell>{supplier.adress}</TableCell>
                                    <TableCell>{supplier.phone}</TableCell>
                                    <TableCell>{supplier.email}</TableCell>
                                    <TableCell>{supplier.cnpj}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(supplier)} sx={{ marginRight: 1 }}>
                                            Edit
                                        </Button>
                                        <Button onClick={() => onDeleteSupplier(supplier.id)} color="secondary">
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
    );
};

export default SupplierList;
