import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
/**
 * Management of the http request to the weather api
 */
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = '2d75f361014bb677d53156ddf1519d28';
  constructor (private readonly http: HttpClient) { }

  /**
   * Sends http request and returns data  from server
   * in form of Observable
   * @param latitude latitude coordinate of the computer
   * @param longitude longitude coordinate of the computer
   * Params needed for the api
   * lat - latitude
   * lon - longitude
   * units - metric/imperial/etc
   * appid - key from admin
   * @returns WeatherData format
   */
  getWeatherByCoords (latitude, longitude): Observable<Object> {
    const params = new HttpParams()
      .set('lat', latitude)
      .set('lon', longitude)
      .set('units', 'metric')
      .set('appid', this.apiKey)
    return this.http.get(this.url, { params })
  }

  /**
   *
   * @param city Write city name to search in api server
   * Params needed for the api
   * q - string with a city name
   * units - metric/imperial/etc
   * appid - key from admin
   * @returns 404 if city is not found
   */
  getWeatherByCity (city: string): Observable <Object> {
    const params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', this.apiKey)
    return this.http.get(this.url, { params })
  }
}
