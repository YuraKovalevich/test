import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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

const CurrencyRateTrends = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [currency, setCurrency] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const chartData = {
        labels: data.map(entry => entry.Date),
        datasets: [
            {
                label: 'Курс',
                data: data.map(entry => entry.Cur_OfficialRate),
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
        <div>
            <h2>Динамика курса валюты</h2>
            <div>
                <label htmlFor="fromDateInput">Дата с:</label>
                <input
                    type="date"
                    id="fromDateInput"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />

                <label htmlFor="toDateInput">Дата по:</label>
                <input
                    type="date"
                    id="toDateInput"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="currencySelect">Выберите валюту:</label>
                <select
                    id="currencySelect"
                    value={currency}
                    onChange={(e) => setCurrency(currencyOptions[e.target.value])}
                >
                    <option value="">Выберите валюту</option>
                    {Object.keys(currencyOptions).map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <button onClick={fetchData} disabled={!fromDate || !toDate || !currency}>
                Отправить запрос
            </button>

            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div style={{ marginTop: '20px' }}>
                    {data.length > 0 ? (
                        <Line data={chartData} options={options} />
                    ) : (
                        <p>Выберите диапазон дат и валюту для отображения данных.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CurrencyRateTrends;
