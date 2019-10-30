import { Injectable, ComponentFactoryResolver, Injector, ViewContainerRef } from '@angular/core'
import { WindowData } from 'src/app/models/windowdata/WindowData'
import { ChatData } from 'src/app/models/socket/chatData'
import { ChatWindowComponent } from 'src/app/components/ChatModule/chat-window/chat-window.component'
import { ChatMsgComponent } from 'src/app/components/ChatModule/chat-msg/chat-msg.component'
import { GameWindowComponent } from '../../components/GameModule/game-window/game-window.component'
import { WeatherWindowComponent } from '../../components/WeatherModule/weather-window/weather-window.component'
import { MinimizeService } from '../MinimizeService/minimize.service'

@Injectable({
  providedIn: 'root'
})
/**
 * Responsible for adding applications
 * to main dashboard component
 */
export class DynamicComponentService {
  data: WindowData = new WindowData()
  container: ViewContainerRef
  /**
   * @description constructor: Instanciates variable data
   * @param cfr ComponentFactoryResolver
   * @param injector Injector
   */
  constructor (
    private readonly cfr: ComponentFactoryResolver,
    private readonly injector: Injector,
    private readonly mini: MinimizeService) {
    this.resetData()
  }

  setContainer (container: ViewContainerRef): void{
    this.container = container
    this.mini.setContainer(this.container)
  }

  /**
   *
   * @param container Anchor to location in DOM where
   * the app is going to be appended

  insertGame (container: ViewContainerRef) {
    console.log('insert game')
    this.createComponent(container, 1)
  } */

  insertGame (): void{
    this.createComponent(1)
  }

  /**
   *
   * @param container  Anchor to location in DOM where
   * the app is going to be appended
   */
  insertChat (): void{
    this.createComponent(2)
  }

  /**
   *
   * @param container  Anchor to location in DOM where
   * the app is going to be appended
   */
  insertWeather (): void{
    this.createComponent(3)
  }

  /**
   *
   * @param container  Anchor to location in DOM where
   * the app is going to be appended
   * @param key Type of app to be appended
   */
  createComponent (key): void {
    const cmpFactory = this.componentFactory(key)
    const componentRef = cmpFactory.create(this.injector)

    componentRef.instance.setData(this.data)
    // this.mini.addApp(this.data.id)
    this.mini.addApp(this.data)
    this.data.increase()
    this.container.insert(componentRef.hostView)
  }

  /**
   * @description Factory that creates components
   * @param key type of app to be appended
   * @returns component by key: Game (1), Chat (2), Weather(3)
   */
  componentFactory (key): any {
    switch (key) {
      case 1:
        this.data.type = 'Game'
        return this.cfr.resolveComponentFactory(GameWindowComponent)
      case 2:
        this.data.type = 'Chat'
        return this.cfr.resolveComponentFactory(ChatWindowComponent)
      case 3:
        this.data.type = 'Weather'
        return this.cfr.resolveComponentFactory(WeatherWindowComponent)
      default:
        break
    }
  }

  /**
   * @description Creates the messages in the chat application
   * @param container  Anchor to location in DOM where
   * the app is going to be appended
   * @param isUser condition if user is sending messages or recieving
   * @param data information form server
   */
  createChatMessage (container: ViewContainerRef, isUser: boolean, data: ChatData): void {
    const cmpFactory = this.cfr.resolveComponentFactory(ChatMsgComponent)
    const componentRef = cmpFactory.create(this.injector)

    componentRef.instance.setData(isUser, data)
    container.insert(componentRef.hostView)
  }

  /**
   * @description Method extracted from constructor for possible
   * uses in the future
   */
  resetData (): void{
    this.data.id = 0
    this.data.index = 0
    this.data.left = 0
    this.data.top = 0
  }
}
