/**
 * @description Data needed for offset calculations and data
 * management for each window application
 */
export class WindowData {
  id: number;
  index: number;
  top?: number;
  left?: number;
  type?: string;

  increase (): void{
    this.id++
    this.index++
    this.top += 15
    this.left += 15

    this.bounce()
  }

  leftOffsetToString (): string {
    const result: string = this.left.toString() + 'px'
    return result
  }

  topOffsetToString (): string {
    const result: string = this.top.toString() + 'px'
    return result
  }

  bounce (): void{
    if (this.top > 200) {
      this.top = 0
    }
    if (this.left > 625) {
      this.left = 0
    }
  }
}
