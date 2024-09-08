import ship from './ship'
import gameBoard from './gameBoard'
import computerPlayer from './computerPlayer'
import realPlayer from './realPlayer'

//ship

test('create ship', () => {
    let x = new ship(1)
    expect(x.length).toBe(1)
    expect(x.hitCount).toBe(0)
})

test('ship hit', () => {
    let x = new ship(2)
    x.hit()
    expect(x.hitCount).toBe(1)
})

test('ship isSunk', () => {
    let x = new ship(2)
    x.hit()
    expect(x.isSunk()).toBe(false)
    x.hit()
    expect(x.isSunk()).toBe(true)
})

//gameboard

test('create gameBoard', () => {
    let x = new gameBoard()
    expect(x.board.length).toBe(10)
    
    for(let i = 0; i < 10; i++){
        expect(x.board[i].length).toBe(10)
    }
})

test('place boat on gameBoard', () => {
    let x = new gameBoard()
    let y = new ship(2)
    x.placeShip(1,1,y)

    expect(x.board[1][1]).toBe(y)
    expect(x.board[2][1]).toBe(y)

    expect(x.board[0][1]).toBe(false)
    expect(x.board[3][1]).toBe(false)
    expect(x.board[1][0]).toBe(false)
    expect(x.board[1][2]).toBe(false)
})

test('place boat close to x border', () => {
    let x = new gameBoard()
    let y = new ship(3)
    let z = new ship(2)
    expect(x.placeShip(8,0,y)).toBe(false)
    expect(x.placeShip(8,0,z)).toBe(true)
})

test('place boat close to other boat', () => {
    let x = new gameBoard()
    let y = new ship(2)
    let z = new ship(2)
    x.placeShip(2,0,y)
    expect(x.placeShip(2,0,z)).toBe(false)
    expect(x.placeShip(0,0,z)).toBe(true)
    expect(x.placeShip(2,1,z)).toBe(true)
})

test('receive attack true/false', () => {
    let x = new gameBoard()
    let y = new ship(3)
    x.placeShip(0,0,y)
    expect(x.receiveAttack(0,0)).toBe(true)
    expect(x.receiveAttack(2,0)).toBe(true)
    expect(x.receiveAttack(2,0)).toBe(false)
    expect(x.receiveAttack(0,0)).toBe(false)
    expect(x.receiveAttack(0,1)).toBe(true)
})

test('receive attack hit', () => {
    let x = new gameBoard()
    let y = new ship(3)
    x.placeShip(0,0,y)
    x.receiveAttack(0,0)
    x.receiveAttack(1,0)
    x.receiveAttack(0,1)

    expect(y.hitCount).toBe(2)
    expect(x.board[0][0]).toBe('hit')
    expect(x.board[0][1]).toBe(true)

    x.receiveAttack(2,0)

    expect(y.isSunk()).toBe(true)
})

test('check if game is over', () => {
    let x = new gameBoard()
    let y = new ship(2)
    let z = new ship(1)

    x.placeShip(0,0,y)
    x.placeShip(0,1,z)

    x.receiveAttack(0,0)

    expect(x.sunkShips).toBe(0)

    x.receiveAttack(1,0)

    expect(x.sunkShips).toBe(1)
    expect(x.isOver).toBe(false)

    x.receiveAttack(0,1)

    expect(x.sunkShips).toBe(2)
    expect(x.isOver).toBe(false)
})

//players

test('computer player random hit', () => {
    let aiPlayer = new computerPlayer()
    let notAiPlayer = new realPlayer()

    for(let i = 0; i < 100; i++){
        aiPlayer.hit(notAiPlayer)
    }

    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            expect(notAiPlayer.gameBoard.board[i][j]).toBe(true)
        }
    }
})

test('player hit', () => {
    let aiPlayer = new computerPlayer()
    let notAiPlayer = new realPlayer()

    notAiPlayer.hit(1,1,aiPlayer)

    expect(aiPlayer.gameBoard.board[1][1]).toBe(true)
    expect(aiPlayer.gameBoard.board[1][0]).toBe(false)
})

test('player hit invalid', () => {
    let aiPlayer = new computerPlayer()
    let notAiPlayer = new realPlayer()

    expect(notAiPlayer.hit(1,1,aiPlayer)).toBe(true)
    expect(notAiPlayer.hit(1,1,aiPlayer)).toBe(false)
})