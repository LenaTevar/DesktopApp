import { Component, ViewChild, ViewContainerRef, AfterViewInit, ElementRef } from '@angular/core'
import { GameService } from '../../../services/GameService/game-service.service'

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'game-app',
  templateUrl: './game-app.component.html',
  styleUrls: ['./game-app.component.css']
})
/**
 * @description Game App main component
 */
export class GameAppComponent implements AfterViewInit {
  @ViewChild('anchor', { read: ViewContainerRef, static: false })
  anchor: ViewContainerRef;

  gameService: GameService;

  constructor (private readonly el: ElementRef) { }
  /**
   * @description After component has been fully initialized
   * init a new game service.
   * GameService so it does not share information with
   * multiple games
   */
  ngAfterViewInit (): void {
    this.gameService = new GameService(this.el)
  }

  /**
   * @description builds boards in 3 sizes:
   * 2x2, 2x3, 4x4
   * @param index type of board to use
   */
  doGame (index): void {
    this.cleanBoard()

    switch (index) {
      case 1:
        this.gameService.buildBoard(4)
        break
      case 2:
        this.gameService.buildBoard(8)
        break
      case 3:
        this.gameService.buildBoard(16)
        break
      default:
        console.log('You shouldn\'t be here...')
        break
    }
  }

  /**
   * @description Removes all previous games from board
   * and cleans score text
   */
  cleanBoard (): void{
    const board = this.el.nativeElement.querySelector('.memory-game')
    let boardHasFirstChild: boolean = board.firstElementChild

    while (boardHasFirstChild) {
      board.removeChild(board.firstElementChild)
      boardHasFirstChild = board.firstElementChild
    }
    this.el.nativeElement.querySelector('.counter').innerText = '0'

    this.el.nativeElement.querySelector('.counter2 ').innerText = '0'
  }
}
