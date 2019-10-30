import { Component, ViewChild, ElementRef, OnInit, ViewContainerRef, OnDestroy, AfterViewInit } from '@angular/core'
import { DynamicComponentService } from '../../../services/DynamicComponent/dynamic-component.service'
import { LNUSocket } from 'src/app/models/socket/SocketService'
import { ChatServiceService } from '../../../services/ChatService/chat-service.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
/**
 * @description Component for Chat application
 */
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('anchor', { read: ViewContainerRef, static: false })
  anchor: ViewContainerRef;

  messagesAnchor;
  userTextArea;
  userSendBtn;
  isFirstMessage = true;
  appSocket: LNUSocket = null;
  channels = ['Apple', 'Banana'];
  currentChannel = 0;
  userIsSaved: boolean;

  constructor (
    private readonly el: ElementRef,
    private readonly dcf: DynamicComponentService,
    private readonly chatsvc: ChatServiceService) {
  }

  /**
   * @description Called after initialization,
   * runs kickstart methods to set up the enviroment
   * @example gets the username from localstorage
   * @see ChatServiceService
   */
  ngOnInit (): void {
    this.messagesAnchor = this.el.nativeElement.querySelector('.messages')
    this.userTextArea = this.el.nativeElement.querySelector('textarea')
    this.userSendBtn = this.el.nativeElement.querySelector('#sendBtn')

    this.userIsSaved = this.isUsernameSaved()
    if (this.userIsSaved) {
      const name = this.chatsvc.getUsername()
      this.el.nativeElement.querySelector('.system').innerText = 'Hello back ' + name + ', start talking!'
    }
  }

  /**
   * @description Called after On Init, when kickstart as ended
   * and the username is saved in localstorage
   */
  ngAfterViewInit (): void {
    this.connectSavedUser()
  }

  /**
   * @description begin communication with service
   * if username is saved in local storage
   */
  connectSavedUser (): void {
    const username = this.chatsvc.getUsername()
    if (username === null || username === '') {
      return
    }

    this.hideAskUsername()
    this.isFirstMessage = false
    const channel = this.channels[this.currentChannel]

    this.appSocket = this.createSocket(username, channel)
    this.appSocket.connect(this.anchor)
  }

  /**
    * @description Send messages or connect if new user
    */
  send (): void {
    const savedAndFirst = !this.userIsSaved && this.isFirstMessage
    if (savedAndFirst) {
      this.connectNewUser()
      return
    }
    this.writeToChat()
  }

  /**
   * @description Sets user input username to the
   * localstorage
   */
  connectNewUser (): void {
    const username = this.userTextArea.value
    const channel = this.channels[0]
    this.chatsvc.setUsername(username)

    this.appSocket = this.createSocket(username, channel)
    this.appSocket.connect(this.anchor)

    this.hideAskUsername()
    this.isFirstMessage = false
  }

  /**
   * @description Creates a new socket for the chat
   * @param username string by user or localstorage
   * @param channel string by socket
   */
  createSocket (username, channel): LNUSocket {
    return new LNUSocket(username, channel, this.el, this.dcf)
  }

  /**
   * @description Takes text area and send a message to the service
   */
  writeToChat (): void {
    console.log('write to chat')
    const userText = this.userTextArea.value
    this.appSocket.send(userText)
    this.userTextArea.value = ''
  }

  /**
   * @description Checks connection and moves to a channel
   * based on index
   * @param index number used to move to a channel
   * @example case 1 : Apple, case 2: Banana
   */
  goToChannel (index): void {
    if (this.appSocket == null) {
      index = 3
    }
    switch (index) {
      case 1:
        this.goToApple()
        break
      case 2:
        this.goToBanana()
        break
      default:
        this.el.nativeElement.querySelector('.system').innerText = 'You are not connected!'
        break
    }
  }

  /**
   * @description Moves chat to channel Banana
   */
  goToBanana (): void {
    this.currentChannel = 1
    this.appSocket.changeChannel(this.channels[this.currentChannel])
  }

  /**
   * @description Moves chat to channel Apple
   */
  goToApple (): void {
    this.currentChannel = 0
    this.appSocket.changeChannel(this.channels[this.currentChannel])
  }

  /**
   * @description CSS add class to hide text to ask for username
   */
  hideAskUsername (): void {
    this.el.nativeElement.querySelector('.system').classList.add('hide')
  }

  /**
   * @description Checks if the service can reach a username
   * @returns boolean if username is null or no-string
   */
  isUsernameSaved (): boolean {
    const username = this.chatsvc.getUsername()
    return !(username === null || username === '')
  }

  /**
   * @description Closes the socket when component is destroyed
   */
  ngOnDestroy (): void {
    if (this.appSocket !== null) {
      this.appSocket.close()
    }
  }
}
