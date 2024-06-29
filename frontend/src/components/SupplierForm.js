import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const SupplierForm = ({ onSupplierAdded }) => {
    const [description, setDescription] = useState('');
    const [adress, setAdress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [adressError, setAdressError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [cnpjError, setCnpjError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim()) {
            setDescriptionError(true);
            return;
        }
        if (!adress.trim()) {
            setAdressError(true);
            return;
        }
        if (!phone.trim()) {
            setPhoneError(true);
            return;
        }
        if (!email.trim()) {
            setEmailError(true);
            return;
        }
        if (!cnpj.trim()) {
            setCnpjError(true);
            return;
        }

        try {
            const newSupplier = { description, adress, phone, email, cnpj };
            const response = await axios.post('http://localhost:8080/suppliers', newSupplier);
            onSupplierAdded(response.data);
            setDescription('');
            setAdress('');
            setPhone('');
            setEmail('');
            setCnpj('');
            setDescriptionError(false);
            setAdressError(false);
            setPhoneError(false);
            setEmailError(false);
            setCnpjError(false);
        } catch (error) {
            console.error('Error adding supplier:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
                Add Supplier
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={descriptionError}
                    helperText={descriptionError && "Description is required"}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="adress"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                    error={adressError}
                    helperText={adressError && "adress is required"}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={phoneError}
                    helperText={phoneError && "Phone number is required"}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                    helperText={emailError && "Email is required"}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="CNPJ"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    error={cnpjError}
                    helperText={cnpjError && "CNPJ is required"}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Add Supplier
                </Button>
            </form>
        </Box>
    );
};

export default SupplierForm;
