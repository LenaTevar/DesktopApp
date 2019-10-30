import { Injectable, ViewContainerRef } from '@angular/core'
import { UtilsService } from '../utils/utils.service'
import { WindowData } from '../../models/windowdata/WindowData'

@Injectable({
  providedIn: 'root'
})
export class MinimizeService {
  currentApps = []
  container: ViewContainerRef
  utils;
  constructor () {
    this.utils = new UtilsService()
  }

  /**
   * @description Sets the anchor ng component used to search in DOM
   * @param container Anchor in DOM sent by main 'app.component.ts'
   * @see app.component.ts
   */
  setContainer (container: ViewContainerRef): void {
    this.container = container
  }

  /**
   * @description Adds app to navbar minimize
   * @param index Application index
   */
  addApp (data: WindowData): void {
    const toAdd = {
      id: data.id,
      type: data.type
    }
    this.currentApps.push(toAdd)
  }

  /**
   * @description Removes app from navbar minimize
   * @param index Application index
   */
  removeApp (index: number): void{
    let i
    for (i = 0; i < this.currentApps.length; i++) {
      if (this.currentApps[i].id === index) {
        this.currentApps.splice(i, 1)
      }
    }
  }

  /**
   * @description Get all apps active at the moment
   */
  getCurrentApps (): any[] {
    return this.currentApps
  }

  /**
   * @description Makes app visible and in top front z-index, for some
   * reason, ts-standard does not get that utils.findHighestZIndex returns
   * a number, even when is defined in the method, so I have to cast it
   * to the standard will not complain
   * @param id number id from the application we want to set visible
   */
  changeVisibility (id): void {
    let el = this.container.element.nativeElement.nextElementSibling
    const zindex = this.utils.findHighestZIndex() as number + 1
    let loop = true
    while (loop) {
      if (el.firstElementChild.id === id.toString()) {
        el.style.display = 'block'
        el.firstElementChild.style.zIndex = zindex
        loop = false
        break
      }
      el = el.nextElementSibling
    }
  }
}
