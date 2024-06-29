import React from 'react';
import './App.css';
import SupplierManagement from './components/SupplierManagement';
import ProductManagement from './components/ProductManagement';


const App = () => {
    return (
        <div className="App">
            <SupplierManagement />
            <ProductManagement />
        </div>
    );
};

export default App;
