import { Component } from '@angular/core'
import { ChatData } from '../../../models/socket/chatData'

@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.css']
})
/**
 * @description message recieved by chat service
 * @var isUser if chat service notice that the message recieved is
 * from our user, flag it. CSS will use that information for styling.
 */
export class ChatMsgComponent {
  isUser: boolean;
  data: ChatData;
  /**
   *
   * @param isUser boolean if user from service data is our user
   * @param chatData ChatData information gotten by server
   */
  setData (isUser, chatData): void {
    this.isUser = isUser
    this.data = chatData
  }
}
