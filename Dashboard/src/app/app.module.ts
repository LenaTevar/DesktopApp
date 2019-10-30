import { BrowserModule } from '@angular/platform-browser'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'

import { ChatModule } from './components/ChatModule/chat.module'
import { ChatWindowComponent } from './components/ChatModule/chat-window/chat-window.component'
import { ChatMsgComponent } from './components/ChatModule/chat-msg/chat-msg.component'

import { GameModule } from './components/GameModule/game.module'
import { GameWindowComponent } from './components/GameModule/game-window/game-window.component'

import { WeatherModule } from './components/WeatherModule/weather.module'
import { WeatherWindowComponent } from './components/WeatherModule/weather-window/weather-window.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    DragDropModule,
    ChatModule,
    GameModule,
    WeatherModule
  ],
  providers: [],
  entryComponents: [
    ChatWindowComponent,
    ChatMsgComponent,
    GameWindowComponent,
    WeatherWindowComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
