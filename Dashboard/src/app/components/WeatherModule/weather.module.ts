import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WeatherWindowComponent } from './weather-window/weather-window.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { WeatherAppComponent } from './weather-app/weather-app.component'

@NgModule({
  declarations: [WeatherWindowComponent, WeatherAppComponent],
  imports: [
    CommonModule,
    DragDropModule
  ]
})
export class WeatherModule {

}
