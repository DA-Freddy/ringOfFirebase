import {  Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot, query, where , doc, Unsubscribe, getDoc, updateDoc } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  gameTrigger = new Subject<any>();
  gameId = "";
  game = {} ;
  unsubGame;
  firestore: Firestore = inject(Firestore)
  constructor() {
    
  }

  subGame(){
    this.unsubGame = this.getCurrentGame();
  }
  
  serviceMethod(game): void {
    this.gameTrigger.next(game);
  }
  async createGame(gameToJson){
    let gameId = '';
    await addDoc(this.getGameRef(), gameToJson).catch(
      (err) => {console.log(err); }
    ).then(
      (docRef) => {if (docRef) {
        console.log('ref id ' + docRef.id);
        gameId = docRef.id;
      }
      }
    )
    return gameId;
  }
  getCurrentGame(){
    let singleDoc = doc(this.getGameRef(), this.gameId);
    return onSnapshot(singleDoc, (element)=>{
      this.game = element.data();
      console.log(this.game);
      this.serviceMethod(this.game);
    })
    // const game = (await getDoc(singleDoc)).data();
    // return game;
  }

  ngOnDestroy(){
    this.unsubGame();
  }

  async saveGame(game){
    await updateDoc(doc(this.getGameRef(),this.gameId), game);
  }

  getGameRef(){
    return collection(this.firestore, 'games');
  }
}


