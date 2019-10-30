import { ChatData } from './chatData'
import { DynamicComponentService } from '../../services/DynamicComponent/dynamic-component.service'
import { ViewContainerRef, ElementRef } from '@angular/core'
/**
 * @description Hopefully deprecated in next iterations, replaced for service.
 * Socket management for chat application
 */
export class LNUSocket {
  lnuSocket;
  myMessage: ChatData = new ChatData();
  username;
  messages = [];
  anchor;
  counter = 0;
  maxMessages = 20;

  /**
     * Constructor
     * @param username string from user input
     * @param channel channel selected
     * @param reference service that gives permission to search in document
     * @param dcs Dynamic adding component service
     */
  constructor (username: string, channel: string,
    private readonly reference: ElementRef,
    private readonly dcs: DynamicComponentService) {
    this.username = username
    this.myMessage.username = (username === '') ? 'Anon' : username
    this.myMessage.channel = (channel === '') ? 'Apple' : channel
    this.lnuSocket = new WebSocket('ws://vhost3.lnu.se:20080/socket/')
  }

  /**
     * Add event listeners to the socket to open connection
     * and recieve messages
     * @param anchor Element anchor where to append messages
     * @method gossip to be deleted
     */
  connect (anchor: ViewContainerRef): void {
    this.anchor = anchor
    this.myMessage.data = 'connecting'

    this.lnuSocket.addEventListener('open', event => {
      this.lnuSocket.send(JSON.stringify(this.myMessage))
    })

    this.lnuSocket.addEventListener('message', event => {
      const response = JSON.parse(event.data) as ChatData
      this.queryAndPublish(response, this.anchor)
      this.gossip(response)
    })
  }

  /**
     * Test method to check that the connection to the server is open
     * @param response object response from server
     */
  gossip (response): void{
    if (response.type === 'message') {
      console.log('Gossip all channels')
      console.log(response)
    }
  }

  /**
     * Query response by username and channel
     * @param response object response from server
     * @param anchor element anchor where to append messages
     */
  queryAndPublish (response, anchor): void{
    if (this.onlyTargetedResponses(response)) {
      const isUser = response.username === this.username
      this.dcs.createChatMessage(anchor, isUser, response)
      this.clean()
    }
  }

  /**
     * Show only 20 messages at the time
     */
  clean (): void {
    this.counter++
    if (this.counter > this.maxMessages) {
      const element = this.reference.nativeElement.querySelector('app-chat-msg')
      element.parentNode.removeChild(element)
      this.counter--
    }
  }

  /**
     * @returns true if response.type is message and
     * channel name is targeted channel
     * @param response response object from the server
     */
  onlyTargetedResponses (response): boolean {
    const message = response.type === 'message'
    const channel = response.channel === this.myMessage.channel
    return message && channel
  }

  /**
     * Sends a message from our user
     * @param input message to be send by user
     */
  send (input): void{
    this.myMessage.data = input
    this.lnuSocket.send(JSON.stringify(this.myMessage))
  }

  /**
     * Changes the messages recieved from channel to another
     * @param channel targeted channel
     */
  changeChannel (channel): void{
    this.myMessage.channel = channel
    this.myMessage.data = 'Entering ' + this.myMessage.channel
    this.lnuSocket.send(JSON.stringify(this.myMessage))
  }

  /**
     * Sends closing message to server and closes the socket
     */
  close (): void{
    this.send(' left the chat app.')
    this.lnuSocket.close()
  }
}
