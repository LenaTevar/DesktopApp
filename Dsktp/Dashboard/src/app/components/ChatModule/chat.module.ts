import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChatMsgComponent } from './chat-msg/chat-msg.component'
import { ChatComponent } from './chat/chat.component'
import { ChatWindowComponent } from './chat-window/chat-window.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
@NgModule({
  declarations: [
    ChatWindowComponent,
    ChatMsgComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    ChatWindowComponent,
    ChatMsgComponent,
    ChatComponent
  ]
})
export class ChatModule { }
