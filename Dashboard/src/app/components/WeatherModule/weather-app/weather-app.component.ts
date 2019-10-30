import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core'
import { WeatherService } from '../../../services/WeatherService/weather-service.service'
import { WeatherData } from '../../../models/weather/WeatherData'

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.css']
})
/**
 * @description Weather App main component
 */
export class WeatherAppComponent implements OnInit, OnDestroy {
  lat = 59.3325800;
  lon = 18.0649000;

  weatherSubs;
  display: WeatherData;
  img;
  cityNameWrong = false;

  constructor (private readonly weathersvc: WeatherService,
    private readonly el: ElementRef) { }

  ngOnInit (): void{
    this.getLocation()
  }

  /**
   * @description Asks user for geolocation permissions or uses
   * Stockholm location
   */
  getLocation (): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lon = position.coords.longitude
        this.lat = position.coords.latitude
        this.weatherSubs = this.weathersvc
          .getWeatherByCoords(this.lat, this.lon)
          .subscribe((info) => {
            this.setUpDisplay(info as WeatherData)
            this.toggleAnimation()
          })
      },
      () => {
        this.weatherSubs = this.weathersvc
          .getWeatherByCoords(this.lat, this.lon)
          .subscribe((info) => {
            this.setUpDisplay(info as WeatherData)
            this.toggleAnimation()
          })
      })
    }
  }

  /**
 * @description Calls service for a city, handles user mistakes
 * @param cityElement User input city to search in weather api
 */
  getByCity (cityElement): void {
    if (cityElement.value === '') { return }

    this.weatherSubs = this.weathersvc.getWeatherByCity(cityElement.value)
      .subscribe((info) => {
        this.setUpDisplay(info as WeatherData)
      },
      (error: any) => {
        console.log('Standard makes me do something with error ', error)
        this.cityNameWrong = true
      })
    cityElement.value = ''
  }

  /**
   * @description Setting up data to display and turning off waiting animation
   * @param data Data recieved from open weather server
   */
  setUpDisplay (data: WeatherData): void{
    this.cityNameWrong = false
    this.display = data
    this.img = 'http://openweathermap.org/img/wn/' + this.display.weather[0].icon + '@2x.png'
  }

  /**
   * @description Turns waiting animation off
   */
  toggleAnimation (): void{
    this.el.nativeElement.querySelector('.loading').classList.toggle('hide')
  }

  /**
   * @description Unsubscribes to weather api on destroy
   */
  ngOnDestroy (): void {
    const appIsSubscribed: boolean = this.weatherSubs
    if (appIsSubscribed) {
      this.weatherSubs.unsubscribe()
    }
  }
}
