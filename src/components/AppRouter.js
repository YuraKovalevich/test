import React from 'react';
import {appRoutes} from '../routes'
import {Routes, Route, Navigate} from 'react-router-dom';
import {DATA_DATE_ROUTE} from "../utils/consts";
import {CurrencyProvider} from "./CurrencyContext";

const AppRouter = () => {
    return (
        <CurrencyProvider>
            <Routes>
                {appRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} Component={Component} exact/>
                )}
                <Route path='*' element={<Navigate to={DATA_DATE_ROUTE} replace={true}/>}/>
            </Routes>
        </CurrencyProvider>
    );
};

export default AppRouter;