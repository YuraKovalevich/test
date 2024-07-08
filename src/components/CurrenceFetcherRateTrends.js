import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { CurrencyContext } from './CurrencyContext';
import styles from '../styles/CurrencyRateTrends.module.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CurrenceFetcherRateTrends = () => {
    const [searchParams] = useSearchParams();
    const [fromDate, setFromDate] = useState(searchParams.get('fromDate') || '');
    const [toDate, setToDate] = useState(searchParams.get('toDate') || '');
    const [currency, setCurrency] = useState(searchParams.get('currency') || '');
    const { data, setData, loading, setLoading, error, setError } = useContext(CurrencyContext);

    useEffect(() => {
        if (fromDate && toDate && currency) {
            fetchData();
        }
    }, []);

    const currencyOptions = {
        'USD': '431',
        'EUR': '451',
        'RUB': '456'
    };

    const BASE_URL = `https://www.nbrb.by/api/exrates/rates/dynamics`;

    const fetchData = () => {
        if (!fromDate || !toDate || !currency) {
            setError('Пожалуйста, выберите диапазон дат и валюту.');
            return;
        }

        setLoading(true);
        const url = `${BASE_URL}/${currency}?startDate=${fromDate}&endDate=${toDate}`;

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setData(data);
                } else {
                    setData([]);
                }
                setLoading(false);
                setError(null);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error.message);
                setLoading(false);
                setError('Произошла ошибка при загрузке данных. Пожалуйста, попробуйте ещё раз.');
            });
    };

    const generateShareLink = () => {
        const baseUrl = window.location.origin;
        const shareUrl = `${baseUrl}/rate-trends?fromDate=${fromDate}&toDate=${toDate}&currency=${currency}`;
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

    const chartData = {
        labels: (data || []).map(entry => entry.Date),
        datasets: [
            {
                label: 'Курс',
                data: (data || []).map(entry => entry.Cur_OfficialRate),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Дата'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Курс'
                }
            }
        }
    };

    return (
        <div className={styles.dynamicsContainer}>
            <h2>Динамика курса валюты</h2>
            <div className={styles.inputGroup}>
                <label className={styles.dynamicsLabel} htmlFor="fromDateInput">Дата с:</label>
                <input
                    className={styles.dynamicsInput}
                    type="date"
                    id="fromDateInput"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />

                <label className={styles.dynamicsLabel} htmlFor="toDateInput">Дата по:</label>
                <input
                    className={styles.dynamicsInput}
                    type="date"
                    id="toDateInput"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.dynamicsLabel} htmlFor="currencySelect">Выберите валюту:</label>
                <select
                    className={styles.dynamicsSelect}
                    id="currencySelect"
                    value={Object.keys(currencyOptions).find(key => currencyOptions[key] === currency) || ''}
                    onChange={(e) => setCurrency(currencyOptions[e.target.value])}
                >
                    <option value="">Выберите валюту</option>
                    {Object.keys(currencyOptions).map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <button className={styles.dynamicsButton} onClick={fetchData} disabled={!fromDate || !toDate || !currency}>
                Отправить запрос
            </button>
            <button className={styles.shareButton} onClick={handleShare} disabled={!fromDate || !toDate || !currency}>
                Поделиться
            </button>

            {loading ? (
                <p className={styles.dynamicsMessage}>Загрузка...</p>
            ) : error ? (
                <p className={styles.dynamicsError}>{error}</p>
            ) : (
                <div className={styles.dynamicsChart}>
                    {data && data.length > 0 ? (
                        <Line data={chartData} options={options} />
                    ) : (
                        <p>Выберите диапазон дат и валюту для отображения данных.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CurrenceFetcherRateTrends;
