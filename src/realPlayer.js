import gameBoard from './gameBoard'

export default class realPlayer{
    constructor(){
        this.gameBoard = new gameBoard()
    }

    hit(x,y,player){
        return player.gameBoard.receiveAttack(x,y)
    }
}