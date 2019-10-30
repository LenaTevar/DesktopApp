import { Injectable, ElementRef } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
/**
 * @description Responsible for DOM manipulation
 * and game logic
 */
export class GameService {
  hasFlippedCard: boolean;
  lock = false;
  firstCard; secondCard;
  backImage = '../../../assets/memoryImg/0.png';
  images = [
    '../../../assets/memoryImg/1.png',
    '../../../assets/memoryImg/2.png',
    '../../../assets/memoryImg/3.png',
    '../../../assets/memoryImg/4.png',
    '../../../assets/memoryImg/5.png',
    '../../../assets/memoryImg/6.png',
    '../../../assets/memoryImg/7.png',
    '../../../assets/memoryImg/8.png'];

  matches = 0;
  mistakes = 0;
  matchesP; mistakesP;
  section; tempArray = [];

  constructor (private readonly reference: ElementRef) {
    this.section = reference.nativeElement.querySelector('.memory-game')
    this.matchesP = reference.nativeElement.querySelector('.counter')
    this.mistakesP = reference.nativeElement.querySelector('.counter2')
  }

  /**
    * Cleans the temporary holder of cards
    * creates a new game
    * @param size number of cards to play
    */
  buildBoard (size: number): void{
    this.tempArray = []
    this.newGame(size)
  }

  /**
   * Creates cards and add events to them
   * @param size number of cards to play
   */
  newGame (size): void{
    const cards = this.fixBoard(size)
    this.addEvents(cards)
  }

  /**
   * Native building of elements cards
   * @param totalCards number of cards to play
   * OBS!
   * I've tested using anchors and inputs type img
   * and neither of them worked properly with tab
   */
  fixBoard (totalCards): any {
    this.shuffleArr(this.images)
    const pairs = totalCards / 2

    for (let index = 0; index < pairs; index++) {
      const a = document.createElement('button')
      // let a = document.createElement('a');
      // let a = document.createElement('input')
      a.type = 'button'
      a.classList.add('memory-card')

      if (pairs === this.images.length) {
        a.classList.add('big')
      }
      a.setAttribute('data-framework', index.toString())
      const front = document.createElement('img')
      front.src = this.images[index]
      front.classList.add('front-face')

      const back = document.createElement('img')
      back.src = this.backImage
      back.classList.add('back-face')

      a.appendChild(front)
      a.appendChild(back)

      const a2 = a.cloneNode(true)
      this.tempArray.push(a)
      this.tempArray.push(a2)
    }
    this.shuffleArr(this.tempArray)

    this.tempArray.forEach(card => {
      this.section.appendChild(card)
    })
    return this.section.querySelectorAll('.memory-card')
  }

  /**
   * Helper method to shuffle any kind of arrays
   * @param array any array
   */
  shuffleArr (array): void{
    let currentIndex = array.length; let temporaryValue; let randomIndex
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
  }

  /**
   * Add event listener to all the cards
   * @param cards Elements created by this service
   */
  addEvents (cards): void{
    cards.forEach(card => {
      card.addEventListener('click', this.flipCard.bind(this))
    })
  }

  /**
   *
   * @param event Event triggered by the user.
   * If the event comes from tab-click>button then the
   * event target is the button element.
   * If the event comes from mouse>click then the
   * event tager is the image element.
   */
  flipCard (event): void {
    event.stopPropagation()
    let currentCard
    const isMemoryCard: boolean = event.target.classList.contains('memory-card')
    if (isMemoryCard) {
      currentCard = event.target
    } else {
      currentCard = event.target.parentElement
    }

    const locked = this.gameIsBlocked(currentCard)
    if (locked) { return }
    this.playCard(currentCard)
  }

  /**
   * Checks if the user tries to click
   * the same card twice or the second card
   * locked the board (avoids playing with a third card)
   * @param card Element sent by user
   *
   */
  gameIsBlocked (card: Element): boolean {
    const cardDoubleClicked = (this.firstCard === card)
    return this.lock || cardDoubleClicked
  }

  /**
   * Manages the variables needed to move
   * the game into the next stage
   * @param card Player clicked card
   */
  playCard (card: Element): void {
    card.classList.toggle('flip')
    if (!this.hasFlippedCard) {
      this.hasFlippedCard = true
      this.firstCard = card
      return
    }
    this.hasFlippedCard = false
    this.secondCard = card
    this.checkMatch()
  }

  /**
   * Locks the board so the player cannot click a third card
   * while checking for the result
   */
  checkMatch (): void {
    this.lock = true
    const match = this.firstCard.dataset.framework === this.secondCard.dataset.framework
    match ? this.isMatch() : this.isNotMatch()
    this.updateShell()
  }

  /**
   * Makes a dramatic wait when the two selected cards are a match
   * and then hide both cards in CSS
   */
  isMatch (): void {
    this.matches++
    setTimeout(() => {
      this.hideElements()
      this.lock = false
    }, 1000)
  }

  /**
   * Adds hide tag to winner cards for CSS to hide
   */
  hideElements (): void {
    this.firstCard.classList.add('hide')
    this.secondCard.classList.add('hide')
  }

  /**
   * Makes a dramatic wait when the two selected cards are not a match
   */
  isNotMatch (): void{
    this.mistakes++
    setTimeout(() => {
      this.unflip()
      this.lock = false
    }, 1000)
  }

  /**
   * Update shell screen tags that show matches and mistakes
   * when playing
   */
  updateShell (): void{
    this.matchesP.innerText = this.matches.toString()
    this.mistakesP.innerText = this.mistakes.toString()
  }

  unflip (): void {
    this.firstCard.classList.toggle('flip')
    this.secondCard.classList.toggle('flip')
    this.resetBoard()
  }

  /**
   * Reset board after un-flipping the cards
   */
  resetBoard (): void {
    [this.lock, this.hasFlippedCard] = [false, false];
    [this.firstCard, this.secondCard] = [null, null]
  }

  shuffle (cards): void {
    cards.forEach(card => {
      const rnd = Math.floor(Math.random() * cards.length)
      card.style.order = rnd
    })
  }
}
