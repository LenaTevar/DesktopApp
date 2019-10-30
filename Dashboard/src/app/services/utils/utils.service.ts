import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
/**
 * @description DOM manipulation methods not related to dynamic manipulation
 */
export class UtilsService {
  /**
   * @description Find highest z-index on document elements
   * with class appWindow. OBS it only checks app Window! not 
   * navbar. 
   * @returns highest z-index in DOM
   */
  findHighestZIndex (): number {
    const elems = document.getElementsByClassName('appWindow')
    let highest = 0

    for (let i = 0; i < elems.length; i++) {
      const zindex = document.defaultView.getComputedStyle(elems[i], null).getPropertyValue('z-index')

      const zindexInt = parseInt(zindex, 10)

      if ((zindexInt > highest) && (zindex !== 'auto')) {
        highest = zindexInt
      }
    }
    return highest
  }
}
