import React, { useContext, useState, useEffect } from 'react';
import styles from '../styles/CurrencyDataDate.module.css';
import { CurrencyContext } from './CurrencyContext';
import { useSearchParams } from 'react-router-dom';

const CurrencyFetcherDataDate = () => {
    const [searchParams] = useSearchParams();
    const [date, setDate] = useState(searchParams.get('date') || '2024-07-01');
    const { currencyData, setCurrencyData, loading, setLoading } = useContext(CurrencyContext);

    const BASE_URL = `https://www.nbrb.by/api/exrates/rates?ondate=${date}&periodicity=0`;

    const fetchData = () => {
        setLoading(true);
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                setCurrencyData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (searchParams.get('date')) {
            fetchData();
        }
    }, [searchParams]);

    const generateShareLink = () => {
        const baseUrl = window.location.origin;
        const shareUrl = `${baseUrl}/rate-date?date=${date}`;
        return shareUrl;
    };

    const handleShare = () => {
        const shareLink = generateShareLink();
        navigator.clipboard.writeText(shareLink).then(() => {
            alert('Ссылка скопирована в буфер обмена!');
        }).catch(err => {
            console.error('Ошибка копирования ссылки:', err);
        });
    };

    return (
        <div className={styles.currencyContainer}>
            <label className={styles.currencyLabel} htmlFor="dateInput">Выберите дату:</label>
            <input
                className={styles.currencyInput}
                type="date"
                id="dateInput"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button className={styles.currencyButton} onClick={fetchData}>Отправить запрос</button>
            <button className={styles.shareButton} onClick={handleShare} disabled={!date}>
                Поделиться
            </button>

            {loading ? (
                <p className={styles.loadingMessage}>Загрузка...</p>
            ) : (
                <ul className={styles.currencyList}>
                    {currencyData.map(currency => (
                        <li className={styles.currencyItem} key={currency.Cur_ID}>
                            {currency.Cur_Abbreviation}: {currency.Cur_OfficialRate}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CurrencyFetcherDataDate;
