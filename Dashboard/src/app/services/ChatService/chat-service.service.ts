import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
/**
 * @description Getter/Setter for localstorage
 * used for username in chat component
 */
export class ChatServiceService {
  local: string;
  key = 'ht222fd-Dashboard';

  setUsername (username: string): void{
    window.localStorage.setItem(this.key, username)
  }

  getUsername (): string {
    return window.localStorage.getItem(this.key)
  }
}
