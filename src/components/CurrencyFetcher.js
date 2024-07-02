import React, {useState} from 'react';

const CurrencyFetcher = () => {
    const [date, setDate] = useState('2024-07-01');
    const [currencyData, setCurrencyData] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <div>
            <label htmlFor="dateInput">Выберите дату:</label>
            <input
                type="date"
                id="dateInput"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={fetchData}>Отправить запрос</button>

            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <ul>
                    {currencyData.map(currency => (
                        <li key={currency.Cur_ID}>
                            {currency.Cur_Abbreviation}: {currency.Cur_OfficialRate}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CurrencyFetcher;