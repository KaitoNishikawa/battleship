export default class gameBoard{
    constructor(){
        this.board = []
        this.sunkShips = 0
        this.isOver = false

        for(let i = 0; i < 10; i++){
            let array = []
            for(let j = 0; j < 10; j++){
                array.push(false)
            }
            this.board.push(array)
        }
    }

    placeShip(x, y, ship){
        if((9 - x) + 1 < ship.length){
            return false
        }

        let x2 = x
        for(let i = 0; i < ship.length; i++){
            if(this.board[x2][y] !== false){
                return false
            }
            x2++
        }
        
        for(let i = 0; i < ship.length; i++){
            this.board[x][y] = ship
            x++
        }

        return true
    }

    receiveAttack(x,y){
        if(this.board[x][y] == true || this.board[x][y] == 'hit'){
            return false
        }

        if(this.board[x][y] != false){
            this.board[x][y].hit()
            
            if(this.board[x][y].isSunk()){
                this.sunkShips += 1
                if(this.sunkShips == 5){
                    this.isOver = true
                }
            }                

            this.board[x][y] = 'hit'
        }

        else{
            this.board[x][y] = true
        }

        return true
    }
}