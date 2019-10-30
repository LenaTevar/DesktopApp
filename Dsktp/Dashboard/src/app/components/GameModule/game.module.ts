import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GameWindowComponent } from './game-window/game-window.component'
import { GameAppComponent } from './game-app/game-app.component'
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
  declarations: [GameWindowComponent, GameAppComponent],
  imports: [
    CommonModule,
    DragDropModule
  ]
})
export class GameModule { }
