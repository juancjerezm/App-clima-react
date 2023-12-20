import { useState } from "react";
export const WeatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "d69cf6ad34be2313fe464d20735948df";
  const difKelvin = 273.15;

  const [ciudad, setCiudad] = useState("");

  const [dataClima, setDataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const fetcClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
      console.log(dataClima);
    } catch (error) {
      console.error("Ocurrio el siguiente problema: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetcClima();
  };

  return (
    <div className="container">
      <h1>Aplicacion del clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
          placeholder="ciudad..."
        />
        <button type="submit">Bsucar</button>
      </form>
      {dataClima && !dataClima.message && (
        <div>
          <h1>{dataClima.name}</h1>
          <p>Temperatura: {parseInt(dataClima?.main.temp - difKelvin)}°C</p>
          <p>Condicion Meteorologica: {dataClima?.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
          />
        </div>
      )}
      {dataClima && dataClima.message && (
        <p>{`error : ${dataClima.message}`}</p>
      )}
    </div>
  );
};
