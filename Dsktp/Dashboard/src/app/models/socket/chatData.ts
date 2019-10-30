/**
 * @description Object that represents response from chat server
 */
export class ChatData {
  type: string;
  data: string;
  username: string;
  channel?: string;
  key: string;

  constructor () {
    this.type = 'message'
    this.key = 'LNU CHAT KEY HERE'
    Console.log('You need the key from the university!!')
  }
}
