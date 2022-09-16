import React from 'react';
import createReactClass from 'create-react-class';
import WeatherComponent from 'components/weather/WeatherComponent';

const WeatherPage = createReactClass({
    displayName: 'Weather Tracker',

    // create map of city : coordinates to display weather for
    // format is {city name: 'latitude,longitude'}
    cityCoordinates: {
        'Chicago, IL': '41.87,-87.62',
        'New York, NY': '40.71,-74.00',
        'Cambridge, MD': '38.56,-76.08',
        'Shelbyville, IN': '39.52,-85.78',
        'Caldwell, ID': '43.66,-116.69',
        'Fort Valley, GA': '32.55,-83.90',
        'Melbourne, FL': '28.11,-80.67',
        'Roswell, NM': '33.40,-104.53',
        'Bristol, CT': '41.68,-72.96',
        'Brighton, CO': '39.96,-104.83',
        'Window Rock, AZ': '35.67,-109.06',
        'Tuskegee, AL': '32.42,-85.71',
        'Claremont, CA': '34.13,-117.73',
        'Fairfield, IA': '41.00,-91.97',
        'San Angelo, TX': '31.44,-100.45',
        'Sterling Heights, MI': '42.58,-83.03',
        'Paterson, NJ': '40.91,-74.16',
        'Springfield, MA': '42.10,-72.59',
        'Hot Springs, AR': '34.49,-93.05',
        'Richmond, VA': '37.54,-77.43'
    },

    render() {
        return (
            <div>
                <h1>Current Weather</h1>
                <WeatherComponent cityCoordinates={this.cityCoordinates} />
            </div>
        );
    }
});

export default WeatherPage;