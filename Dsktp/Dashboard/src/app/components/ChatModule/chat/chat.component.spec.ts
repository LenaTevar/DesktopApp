import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ChatComponent } from './chat.component'

describe('ChatComponent', () => {
  let component: ChatComponent
  let fixture: ComponentFixture<ChatComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponent]
    })
      .compileComponents().catch(error => console.error(error))
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy().catch(error => console.error(error))
  })
})
