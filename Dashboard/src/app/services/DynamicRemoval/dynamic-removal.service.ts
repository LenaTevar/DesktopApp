import { Injectable, ViewContainerRef } from '@angular/core'
import { MinimizeService } from '../MinimizeService/minimize.service'

@Injectable({
  providedIn: 'root'
})
/**
 * Removes views from the container reference
 */
export class DynamicRemovalService {
  container: ViewContainerRef;
  constructor (private readonly mini: MinimizeService) { }
  /**
   *
   * @param container Anchor container
   */
  setContainer (container: ViewContainerRef): void {
    this.container = container
  }

  /**
   * @description Searches for element by id in anchor siblings
   * and removes it when found.
   * Container remove requires index of the element.
   * TS Standard require booleans on conditionals, adding
   * weird workaround.
   * @param id number id from elements
   */
  remove (id): void{
    const myel = this.container.element.nativeElement
    let el = myel.nextElementSibling
    let index = 0
    let hasSibling: boolean = el
    while (hasSibling) {
      if (el.firstElementChild.id === id.toString()) {
        this.container.remove(index)
        this.mini.removeApp(id)
        break
      }
      index++
      hasSibling = el = el.nextElementSibling
    }
  }
}
