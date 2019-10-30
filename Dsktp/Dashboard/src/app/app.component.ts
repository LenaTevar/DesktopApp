import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core'
import { DynamicComponentService } from './services/DynamicComponent/dynamic-component.service'
import { DynamicRemovalService } from './services/DynamicRemoval/dynamic-removal.service'
import { MinimizeService } from './services/MinimizeService/minimize.service'
import { UtilsService } from './services/utils/utils.service';

/**
 * Main component manages nav bar and calls the service in charge
 * that adds components (apps) in the desktop.
 * @var anchor: Angular container that point the place in the DOM
 * that has to hold the components.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('anchor', { read: ViewContainerRef, static: false })
  anchor: ViewContainerRef;
  currentApps = []
  constructor (private readonly dc: DynamicComponentService,
    private readonly dr: DynamicRemovalService,
    private readonly mini: MinimizeService) {
    this.currentApps = this.mini.getCurrentApps()
  }

  /**
     * @description Sets anchor containers in the services to create
     * and delete components
     */
  ngAfterViewInit (): void{
    this.dc.setContainer(this.anchor)
    this.dr.setContainer(this.anchor)
  }

  /**
   * @description Calls service and creates the third asked app
   * in this case, a weather app
   */
  createApp (): void{
    this.dc.insertWeather()
  }

  /**
   * @description Calls service and creates the memory game
   */
  createGame (): void {
    this.dc.insertGame()
  }

  /**
   * @description Calls service and creates the chat app
   */
  createChat (): void {
    this.dc.insertChat()
  }

  /**
   * @description Calls service to change visibility of application
   * to make it visible
   * @param event dropup menu element that triggered the function
   */
  minim (event): void {
    this.mini.changeVisibility(event.target.id)
  }
}
