import React from 'react';
import CurrencyFetcherDataDate from "../components/CurrencyFetcherDataDate";
import styles from '../styles/CurrencyDataDate.module.css'

const CurrencyDataDate = () => {
   return(
       <div className={styles.container}>
           <CurrencyFetcherDataDate/>
       </div>
   )
};

export default CurrencyDataDate;
