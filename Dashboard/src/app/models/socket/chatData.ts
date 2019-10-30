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
    this.key = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
  }
}
