import React from 'react';
import { createRoot } from 'react-dom/client';
import WeatherPage from './pages/WeatherPage';

// load our react app into page
window.onload = () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    root.render(<WeatherPage />);
}