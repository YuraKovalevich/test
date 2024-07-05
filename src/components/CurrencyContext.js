import React, { createContext, useState } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currencyData, setCurrencyData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    return (
        <CurrencyContext.Provider value={{ currencyData, setCurrencyData, loading, setLoading, error, setError, data, setData }}>
            {children}
        </CurrencyContext.Provider>
    );
};
