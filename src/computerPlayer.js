import gameBoard from './gameBoard'

export default class computerPlayer{
    constructor(){
        this.gameBoard = new gameBoard()
    }

    hit(player){
        while(true){
            let x = Math.floor(Math.random() * 10)
            let y = Math.floor(Math.random() * 10)
            if(player.gameBoard.receiveAttack(x,y)){
                break
            }
        }
    }
}