import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WeatherObj, WeatherWithDesiredFields } from '../interfaces/weather';

const APP_ID = '35dace812d2cdfc6ad025d8fcb94d18f';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  degreeToCardinalDirection(deg: number): string {

    const degree = deg % 360;

    if (degree == 0 || degree == 360) {
      return 'N (North)';
    } else if (degree == 90) {
      return 'E (East)';
    } else if (degree == 180) {
      return 'S (South)';
    } else if (degree == 270) {
      return 'W (West)';
    } else if (degree > 0 || degree < 90) {
      return 'NE (North East)';
    } else if (degree > 90 || degree < 180) {
      return 'SE (South East)';
    } else if (degree > 180 || degree < 270) {
      return 'SW (South West)';
    } else if (degree > 270 || degree < 360) {
      return 'NW (North West)';
    } else {
      return 'Incorrect input.'
    }

  }


  getWeatherByCityName(cityName: string): Observable<WeatherWithDesiredFields> {
    return this.http.get<WeatherObj>(`${WEATHER_API_URL}?q=${cityName}&appid=${APP_ID}`).pipe(
      map((w) => {
        return {
          name: w.name,
          temperature: w.main.temp - 273.15, // Kelvin to celsius
          condition: w.weather[0].main,
          windSpeed: w.wind.speed * 3.6, // meter/sec to kilometer/hour
          windDirection: this.degreeToCardinalDirection(w.wind.deg),
          pressure: w.main.pressure,
          humidity: w.main.humidity
        }
      })
    )
  }


}
