import { Component, ViewChild, ElementRef, OnInit } from '@angular/core'
import { WindowData } from 'src/app/models/windowdata/WindowData'
import { UtilsService } from 'src/app/services/utils/utils.service'
import { DynamicRemovalService } from '../../../services/DynamicRemoval/dynamic-removal.service'

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.css']
})
/**
 * @description standarized window app
 * @see Helena ask her for more about this
 */
export class GameWindowComponent implements OnInit {
  @ViewChild('appWindow', { static: false }) myInput: ElementRef;

  data: WindowData = new WindowData();
  left: string;
  top: string;

  constructor (
    private readonly utils: UtilsService,
    private readonly dr: DynamicRemovalService,
    private readonly el: ElementRef) {}

  ngOnInit (): void{
    this.toggleIndex()
  }

  /**
   * @description set ups data information for CSS to manage
   * @param data Data from service.
   * @example
   * this.data = data // wrong use, data is binded to the service
   */
  setData (data: WindowData): void {
    this.data.index = data.index
    this.data.id = data.id

    this.left = data.leftOffsetToString()
    this.top = data.topOffsetToString()

    this.data.left = data.left
    this.data.top = data.top
  }

  /**
   * @description changes z-index to be on top of other applications
   */
  toggleIndex (): void{
    const max = this.utils.findHighestZIndex()

    if (this.data.index === max) {

    } else {
      this.data.index = max + 1
    }
  }

  /**
   * Calls service to remove the application
   */
  close (): void {
    this.dr.remove(this.data.id)
  }

  /**
   * @description possible extra functinality yet to be done
   */
  minimize (): void{
    this.el.nativeElement.style.display = 'none'
  }
}
