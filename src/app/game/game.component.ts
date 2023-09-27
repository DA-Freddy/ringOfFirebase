import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game = new Game;
  gameId;
  gameStats;
  private sub;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private firebaseServ: FirebaseService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.gameId = params['gameId'];
      this.firebaseServ.gameId = this.gameId;
      // this.loadGame();
      this.firebaseServ.subGame();
    });

    this.firebaseServ.gameTrigger.subscribe(game => {
      console.log(game);
    });
  }

  loadGame() {
    
    this.gameStats = this.firebaseServ.game;

    console.log(this.gameStats);
    if (this.gameStats) {
      this.game.stack = this.gameStats.stack;
      this.game.players = this.gameStats.players;
      this.game.playedCards = this.gameStats.playedCards;
      this.game.currentPlayer = this.gameStats.currentPlayer;
      this.game.pickCardAnimation = this.gameStats.pickCardAnimation;
      this.game.currentCard = this.gameStats.currentCard;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



  pickCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      console.log('Picked Card is: ' + this.game.currentCard);
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.firebaseServ.saveGame(this.game.gameToJson());
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.firebaseServ.saveGame(this.game.gameToJson());
      }, 1250);
    }
  }


  openDialog(): void {
    
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length >= 3) {
        this.game.players.push(name);
        this.firebaseServ.saveGame(this.game.gameToJson());
      }
    });

  }
}

function playerName(value: any): void {
  throw new Error('Function not implemented.');
}
