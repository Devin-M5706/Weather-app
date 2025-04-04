import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  font-family: 'Arial', sans-serif;
`;

const WeatherCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  max-width: 400px;
  width: 90%;
`;

const Temperature = styled.h1`
  font-size: 4rem;
  margin: 0;
  font-weight: 300;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin: 1rem 0;
  text-transform: capitalize;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const DetailItem = styled.div`
  text-align: center;
  min-width: 100px;
`;

const WeatherIcon = styled(motion.div)`
  width: 150px;
  height: 150px;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
`;

const RefreshButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
`;

// Simulated weather conditions
const weatherConditions = [
  { description: 'Sunny', icon: '☀️', temp: 75, humidity: 45, windSpeed: 8 },
  { description: 'Partly Cloudy', icon: '⛅', temp: 70, humidity: 50, windSpeed: 10 },
  { description: 'Cloudy', icon: '☁️', temp: 65, humidity: 60, windSpeed: 12 },
  { description: 'Rainy', icon: '🌧️', temp: 60, humidity: 80, windSpeed: 15 },
  { description: 'Thunderstorm', icon: '⛈️', temp: 55, humidity: 85, windSpeed: 20 },
  { description: 'Snowy', icon: '❄️', temp: 30, humidity: 75, windSpeed: 18 },
  { description: 'Foggy', icon: '🌫️', temp: 50, humidity: 90, windSpeed: 5 }
];

function App() {
  const [weather, setWeather] = useState(weatherConditions[0]);
  const [loading, setLoading] = useState(false);

  const updateWeather = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * weatherConditions.length);
      // Add some random variation to temperature
      const tempVariation = Math.floor(Math.random() * 10) - 5;
      const humidityVariation = Math.floor(Math.random() * 10) - 5;
      const windVariation = Math.floor(Math.random() * 5) - 2;
      
      setWeather({
        ...weatherConditions[randomIndex],
        temp: weatherConditions[randomIndex].temp + tempVariation,
        humidity: Math.min(100, Math.max(0, weatherConditions[randomIndex].humidity + humidityVariation)),
        windSpeed: Math.max(0, weatherConditions[randomIndex].windSpeed + windVariation)
      });
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    updateWeather();
  }, []);

  if (loading) {
    return (
      <Container>
        <WeatherCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>Updating weather data...</p>
        </WeatherCard>
      </Container>
    );
  }

  return (
    <Container>
      <WeatherCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>State College, PA</h2>
        <WeatherIcon
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {weather.icon}
        </WeatherIcon>
        <Temperature>{Math.round(weather.temp)}°F</Temperature>
        <Description>{weather.description}</Description>
        <Details>
          <DetailItem>
            <h3>Humidity</h3>
            <p>{weather.humidity}%</p>
          </DetailItem>
          <DetailItem>
            <h3>Wind</h3>
            <p>{Math.round(weather.windSpeed)} mph</p>
          </DetailItem>
        </Details>
        <RefreshButton onClick={updateWeather}>
          Update Weather
        </RefreshButton>
      </WeatherCard>
    </Container>
  );
}

export default App; 