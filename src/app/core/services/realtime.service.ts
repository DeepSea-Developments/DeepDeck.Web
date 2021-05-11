import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(
    private socket: Socket,
    private authSocket: AuthService
  ) { }

  public connectSocket = () => {
    let authData = this.authSocket.getSocketAuth()
    this.socket.on('connect', () => {
      console.log(authData);
      this.socket.emit('join', authData)
    });
  }


  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('message-room', (message) => {
        console.log("msg", message);
        observer.next(message);
      });
    });
  }
}
