import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
  

export class StartScreenComponent {
constructor(private router: Router, private firebaseServ: FirebaseService) { }


  async newGame() {
    // console.log('New Game');
    
    let game = new Game();
    let gameToJson = game.gameToJson();
    let gameId = await this.firebaseServ.createGame(gameToJson);

    console.log('returned id: ' + gameId);
    this.router.navigate(['/game', gameId]);
  }
}
