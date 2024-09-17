import React, { useEffect, useRef, useState } from "react";
import search_icon from "../assets/search.png";

import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temp: Math.floor(data.main.temp),
        feels_like: Math.floor(data.main.feels_like),
        city: data.name,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in Fetching Api data");
    }
  };
  useEffect(() => {
    search("Rawalpindi");
  }, []);

  return (
    <>
      <section className="grid min-h-[600px] w-full max-w-md rounded-2xl bg-white bg-gradient-to-tl from-red-900 via-pink-700 to-pink-500 p-6">
        {/* <!-- Wrapper --> */}
        <div className="flex h-full flex-col gap-y-5 rounded-2xl text-violet-100">
          <div className="relative flex items-center gap-x-2">
            <input
              ref={inputRef}
              className="w-full rounded-full bg-white  placeholder:text-violet-800/50 py-3 pl-11 pr-4 text-violet-800 outline-none focus:ring-0"
              placeholder="Search"
            />
            <button
              onClick={() => search(inputRef.current.value)}
              className="grid aspect-square h-12 w-13 place-items-center rounded-full bg-white outline-none transition-colors duration-200 ease-in-out hover:bg-slate-300"
            >
              <img src={search_icon} alt="search" />
            </button>
          </div>
          {weatherData ? (
            <>
              <main className="b relative flex-1">
                <div id="weather" className="mx-auto my-4 h-28 max-w-xs">
                  {/* <!--            ICON HERE--> */}
                  <img
                    className="h-28 w-auto mx-auto"
                    src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                    alt="Weather"
                  />
                  <p className="text-md font-medium italic text-center capitalize">
                    {weatherData.description}{" "}
                  </p>
                </div>
                <div className="text-center space-y-4 pt-5">
                  <h2 className="font-bold text-3xl">{weatherData.city}</h2>
                  <h3 className="font-extrabold text-5xl">
                    {weatherData.temp}°C
                  </h3>
                  <h3 className="font-bold text-3xl">
                    {weatherData.feels_like}°{" "}
                    <span className="text-2xl font-medium italic">
                      Feels Like
                    </span>
                  </h3>
                </div>
                <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 border-t border-violet-500 pt-3 text-violet-300">
                  <div className="flex items-center gap-2">
                    <img src={humidity_icon} alt="Humidity" />
                    <div className="">
                      <p className="text-md font-extrabold">
                        {weatherData.humidity}%
                      </p>
                      <p className="text-md font-medium">Humidity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={wind_icon} alt="Wind Speed" />
                    <div className="">
                      <p className="text-md font-extrabold">
                        {weatherData.wind} km/h
                      </p>
                      <p className="text-md font-medium">Wind Speed</p>
                    </div>
                  </div>
                </div>
              </main>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default Weather;
