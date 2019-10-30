import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { GameWindowComponent } from './game-window.component'

describe('GameWindowComponent', () => {
  let component: GameWindowComponent
  let fixture: ComponentFixture<GameWindowComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameWindowComponent]
    })
      .compileComponents().catch(error => console.error(error))
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWindowComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy().catch(error => console.error(error))
  })
})
