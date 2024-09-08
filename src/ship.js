export default class ship{
    constructor(length){
        this.length = length
        this.hitCount = 0
    }

    hit(){
        this.hitCount += 1
    }

    isSunk(){
        if(this.hitCount == this.length){
            return true
        }
        return false
    }
}
