/**
 * @deprecated MemoryGame replaced by a Service
 * Hopefully removed in next commits
 */
export class MemoryGame {
  hasFlippedCard: boolean;
  firstCard: any;
  secondCard: any;
  matchCounter: number;
  matchMax: number;
  lock: boolean;
  constructor () {
    this.lock = false
  }

  setUpGame (cards): void {
    cards.forEach(card => {
      console.log('card', card)
      card.addEventListener('click', this.flipCard.bind(this))
      // console.log(card);
    })
    this.resetBoard()
    this.shuffle(cards)
  }

  flipCard (event): void {
    event.stopPropagation()
    console.log('Event >> Card Flipped')
    const currentCard = event.target.parentElement
    const locked = this.gameIsBlocked(currentCard)
    if (locked) { return }
    this.playCard(currentCard)
  }

  gameIsBlocked (card: Element): boolean {
    const cardDoubleClicked = (this.firstCard === card)
    return this.lock || cardDoubleClicked
  }

  playCard (card: Element): void {
    card.classList.toggle('flip')
    if (!this.hasFlippedCard) {
      console.log('PlayCard - ', this.hasFlippedCard)
      this.hasFlippedCard = true
      this.firstCard = card
      return
    }
    this.hasFlippedCard = false
    this.secondCard = card
    this.checkMatch()
  }

  checkMatch (): void {
    this.lock = true
    const match = this.firstCard.dataset.game === this.secondCard.dataset.game
    match ? this.isMatch() : this.isNotMatch()
  }

  isMatch (): void {
    setTimeout(() => {
      this.hideElements()
      this.lock = false
    }, 1000)
  }

  hideElements (): void {
    this.firstCard.classList.add('hide')
    this.secondCard.classList.add('hide')
  }

  isNotMatch (): void {
    setTimeout(() => {
      this.unflip()
      this.lock = false
    }, 1000)
  }

  unflip (): void {
    this.firstCard.classList.toggle('flip')
    this.secondCard.classList.toggle('flip')
    this.resetBoard()
  }

  resetBoard (): void {
    [this.lock, this.hasFlippedCard] = [false, false];
    [this.firstCard, this.secondCard] = [null, null]
  }

  shuffle (cards): void {
    cards.forEach(card => {
      const random = Math.floor(Math.random() * 16)
      card.style.order = random
    })
  }
}
