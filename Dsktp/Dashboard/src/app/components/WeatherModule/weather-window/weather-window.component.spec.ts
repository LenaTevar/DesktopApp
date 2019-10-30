import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WeatherWindowComponent } from './weather-window.component'

describe('WeatherWindowComponent', () => {
  let component: WeatherWindowComponent
  let fixture: ComponentFixture<WeatherWindowComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherWindowComponent]
    })
      .compileComponents().catch(error => console.error(error))
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWindowComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy().catch(error => console.error(error))
  })
})
