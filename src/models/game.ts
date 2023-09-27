export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation : boolean = false;
    public currentCard: string = "";

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);           
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);            
        }
        shuffle(this.stack);
    }

    gameToJson(){
      return {
        players : this.players,
        stack : this.stack,
        playedCards : this.playedCards,
        currentPlayer : this.currentPlayer,
        pickCardAnimation : this.pickCardAnimation,
        currentCard : this.currentCard,
      }
    }
}



function shuffle(stackArr) {
  let currentIndex = stackArr.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [stackArr[currentIndex], stackArr[randomIndex]] = [stackArr[randomIndex], stackArr[currentIndex]];
  }
  return stackArr;
}