import React, { useState } from 'react';

const CurrencyDataDate = () => {
    const [date, setDate] = useState('2024-07-01');
    const BASE_URL = `https://www.nbrb.by/api/exrates/rates?ondate=${date}&periodicity=0`;

    const fetchData = () => {
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error fetching data:', error));
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
        </div>
    );
};

export default CurrencyDataDate;
