import { Movie } from './../models/movie.model';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PushNotificationMovieEnum } from '../enums/movie.enum';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MoviesEmitter {
  @WebSocketServer()
  server: Server;

  async emitNewMovieNotification(newMovie: Movie) {
    this.server.emit(PushNotificationMovieEnum.PushNewNotification, newMovie);
  }
}
