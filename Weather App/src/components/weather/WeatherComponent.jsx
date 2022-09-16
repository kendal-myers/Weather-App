import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetch from 'logic/FetchProvider';

import { DataGrid } from '@mui/x-data-grid';

import 'components/weather/WeatherStyle.css';

function WeatherComponent({ cityCoordinates }) {

    //initialize states
    const [weather, setWeather] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(0);
    const [timer, setTimer] = useState(null);

    // fetch initial data and create refresh timer
    if (timer === null) {
        fetchWeather();
        setTimer(setInterval(fetchWeather, 30000));
    }

    //clean up timer on component unload
    useEffect(() => {
        return () => {
            if (timer) {
                clearInterval(timer);
                setTimer(null);
            }
        }
    }, [timer])

    // fetch weather for each city cityCoordinates map 
    function fetchWeather() {
        const apiKey = '6278b9b1ab08b71d41c4dae4f5b08147';

        let promises = [];
        for (var index in Object.keys(cityCoordinates)) {
            const city = Object.keys(cityCoordinates)[index];
            const [lat, lon] = cityCoordinates[city].split(',');

            const promise = fetch('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=en&units=metric&appid=${apiKey}`)
                .then(
                    (resp) => {
                        return { 'city': city, 'data': resp };
                    },
                    (err) => {
                        console.error('Failed to retrieve weather information for [$s]', city);
                        return Promise.reject();
                    }
                );

            promises.push(promise);
        }

        // wait until all api calls have completed and store data in weather state
        Promise.all(promises).then(
            (data) => {
                data.sort((d1, d2) => d1.city.localeCompare(d2.city));
                setWeather(data);
            },
            (err) => {
                alert('An error occured while fetching weather data');
                setWeather(null);
                if (timer) {
                    clearInterval(timer);
                }
            }
        )
    }

    //transform weather data into a format readable by DataGrid component
    function formatRows(data) {
        return data.map(d => {
            return {
                id: d.city,
                city: d.city,
                pressure: d.data.main.pressure,
                humidity: d.data.main.humidity,
                temp: (d.data.main.temp + '\u00B0 C')
            };
        })
    }

    // show loading indicator until initial data fetch is complete
    if (weather === undefined) {
        return (
            <div>
                <i>Loading...</i>
            </div>
        );
    }

    // show fail message on api request failure
    if (weather === null) {
        return (
            <div>
                <i>Error retrieving data. Please wait a while and refresh your page to try again.</i>
            </div>
        );
    }

    // define columns for data grid
    const columnDef = [
        { field: 'city', headerName: 'City Name', flex: 2, headerClassName: 'weather-grid-header' },
        { field: 'pressure', headerName: 'Pressure', flex: 1, headerClassName: 'weather-grid-header' },
        { field: 'humidity', headerName: 'Humidity', flex: 1, headerClassName: 'weather-grid-header' },
        { field: 'temp', headerName: 'Temperature', flex: 1, headerClassName: 'weather-grid-header' }
    ];

    // format weather data
    const formattedWeather = formatRows(weather);

    return (
        <div style={{ height: '500px' }}>
            <DataGrid columns={columnDef}
                rows={formattedWeather}
                page={currentPage}
                getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'weather-row even' : 'weather-row odd'}
                onPageChange={(newPage) => setCurrentPage(newPage)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                pagination
                autoHeight />
        </div>
    );
}

WeatherComponent.propTypes = {
    cityCoordinates: PropTypes.object.isRequired
};

export default WeatherComponent;