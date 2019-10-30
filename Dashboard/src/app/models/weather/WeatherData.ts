/**
 * @description Object that represents the object recieved by Weather api
 * @see Weather-Service
 */
export class WeatherData {
  coord: {
    lon: number
    lat: number};

  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ];

  base: string;
  main: {
    temp: number
    pressure: number
    humidity: number
    temp_min: number
    temp_max: number
  };

  wind: {
    speed: number
    deg: number
  };

  clouds: {
    all: number
  };

  dt: number;
  sys: {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  };

  timezone: number;
  id: number;
  name: string;
  cod: number;
}
