import computerPlayer from './computerPlayer'
import ship from './ship'
import realPlayer from './realPlayer'

export default class UI{
    static init(){  
        const modal = document.querySelector('#place-boat-modal')
        const overlay = document.querySelector('#overlay')

        modal.classList.add('active')
        overlay.classList.add('active')

        this.notAiPlayer = new realPlayer()
        this.aiPlayer = new computerPlayer()

        this.playerGameBoard = this.notAiPlayer.gameBoard
        this.computerGameBoard = this.aiPlayer.gameBoard

        this.boatLengths = [5, 4, 3, 3, 2]
        this.placeCount = 0

        UI.loadPlaceModalGrid()
        UI.loadPlayerModalGrid()
        UI.loadComputerModalGrid()
        UI.initNewGameButton()
    }

    static loadPlaceModalGrid(){
        const grid = document.getElementById('place-boat-grid')
        grid.innerHTML = ''

        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let gridItem = document.createElement('div')
                gridItem.classList.add('grid-item')
                gridItem.classList.add('place')
                gridItem.id = 'place ' + j + i

                
                gridItem.style.backgroundColor = UI.getPlayerGridItemColor(j,i)
                

                grid.appendChild(gridItem)
            }
        }
        
        UI.initPlaceGridItemHover()
    }

    static loadPlayerModalGrid(){
        const grid = document.getElementById('player-boat-grid')
        grid.innerHTML = ''

        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let gridItem = document.createElement('div')
                gridItem.classList.add('grid-item')
                gridItem.classList.add('player')
                gridItem.id = 'player ' + j + i

                
                gridItem.style.backgroundColor = UI.getPlayerGridItemColor(j,i)
                

                grid.appendChild(gridItem)
            }
        }
    }

    static loadComputerModalGrid(){
        const grid = document.getElementById('computer-boat-grid')
        grid.innerHTML = ''

        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let gridItem = document.createElement('div')
                gridItem.classList.add('grid-item')
                gridItem.classList.add('computer')
                gridItem.id = 'computer ' + j + i

                
                gridItem.style.backgroundColor = UI.getComputerGridItemColor(j,i)
                

                grid.appendChild(gridItem)
            }
        }

        UI.initComputerGridHover()
    }

    static initNewGameButton(){
        const modal = document.querySelector('#display-winner-modal')
        const overlay = document.querySelector('#overlay')
        const button = document.querySelector('#new-game-button')

        button.addEventListener('click', () => {
            modal.classList.remove('active')
            overlay.classList.remove('active')
            this.init()
        })
    }

    static initPlaceGridItemHover(){
        const grid = document.querySelector('#place-boat-grid')
        const items = grid.querySelectorAll('.grid-item')

        items.forEach((div) => {
            div.addEventListener('mouseover', () => {
                this.placeGridItemMouseover(div.id, true)
            })
            div.addEventListener('mouseout', () => {
                this.placeGridItemMouseover(div.id, false)
            })
            div.addEventListener('click', () => {
                this.placeGridItemClick(div.id)
            })
        })
    }

    static initComputerGridHover(){
        const grid = document.querySelector('#computer-boat-grid')
        const items = grid.querySelectorAll('.grid-item')

        items.forEach((div) => {
            div.addEventListener('mouseover', () => {
                this.computerGridItemMouseover(div.id, true)
            })
            div.addEventListener('mouseout', () => {
                this.computerGridItemMouseover(div.id, false)
            })
            div.addEventListener('click', () => {
                this.computerGridItemClick(div.id)
            })
        })
        
    }

    static getPlayerGridItemColor(x,y){
        if(this.playerGameBoard.board[x][y] == false){
            return '#FFFFFF00'
        }
        else if(this.playerGameBoard.board[x][y] == true){
            return '#92ffb5'
        }
        else if(this.playerGameBoard.board[x][y] == 'hit'){
            return '#ff8585'
        }
        else{
            return '#444444'
        }
    }

    static getComputerGridItemColor(x, y){
        if(this.computerGameBoard.board[x][y] == true){
            return '#92ffb5'
        }
        else if(this.computerGameBoard.board[x][y] == 'hit'){
            return '#ff8585'
        }
        else{
            return '#FFFFFF00'
        }
    }

    static updateBoatType(){        
        const message = document.querySelector('h2')
        const battleshipBoats = ['Carrier', 'Battleship', 'Destroyer', 'Submarine', 'Patrol Boat']        
        this.placeCount += 1

        if(this.placeCount < 5){
            message.textContent = 'Place your ' + battleshipBoats[this.placeCount]
        }
        else{
            const modal = document.querySelector('#place-boat-modal')
            const overlay = document.querySelector('#overlay')

            modal.classList.remove('active')
            overlay.classList.remove('active')

            message.textContent = 'Place your ' + battleshipBoats[0]
        }
    }

    static placeGridItemMouseover(div, shouldAdd){
        let length = this.boatLengths[this.placeCount]

        for(let i = 0; i < length; i++){
            let position = Number(div[6]) + i
            if(position > 9) break
            let id = 'place' + ' ' + position + div[7]

            const gridItem = document.getElementById(id)
            if(shouldAdd) gridItem.style.backgroundColor = '#92ffb5'
            else gridItem.style.backgroundColor = this.getPlayerGridItemColor(Number(div[6]) + i, Number(div[7]))
        }
    }

    static computerGridItemMouseover(div, shouldAdd){
        const gridItem = document.getElementById(div)
        if(gridItem.style.backgroundColor == 'rgba(255, 255, 255, 0)' && shouldAdd){
            gridItem.style.backgroundColor = '#00000020'
        }
        else if(!shouldAdd) gridItem.style.backgroundColor = this.getComputerGridItemColor(Number(div[9]), Number(div[10]))
    }

    static placeGridItemClick(div){
        let playerBoat = new ship(this.boatLengths[this.placeCount])
        let computerBoat = new ship(this.boatLengths[this.placeCount])
        if(this.playerGameBoard.placeShip(Number(div[6]), Number(div[7]), playerBoat)){
            this.computerGameBoard.placeShip(Number(div[6]), Number(div[7]), computerBoat)
            UI.loadPlaceModalGrid()
            UI.loadPlayerModalGrid()
            UI.updateBoatType()
        }        
    }

    static computerGridItemClick(div){        
        if(this.notAiPlayer.hit(Number(div[9]), Number(div[10]), this.aiPlayer)){
            UI.loadComputerModalGrid() 

            if(this.aiPlayer.gameBoard.isOver){
                const modal = document.querySelector('#display-winner-modal')
                const overlay = document.querySelector('#overlay')

                modal.classList.add('active')
                overlay.classList.add('active')

                const message = modal.querySelector('h1')
                message.textContent = 'Player Wins'
            }
            else{
                this.aiPlayer.hit(this.notAiPlayer)

                if(this.notAiPlayer.gameBoard.isOver){
                    const modal = document.querySelector('#display-winner-modal')
                    const overlay = document.querySelector('#overlay')

                    modal.classList.add('active')
                    overlay.classList.add('active')
                    
                    const message = modal.querySelector('h1')
                    message.textContent = 'Computer Wins'                
                }
                UI.loadPlayerModalGrid()
            }
        } 
    }
}