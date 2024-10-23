class Calculator {
    constructor(x, y) {
        this.x = x,
            this.y = y
    }
    add() {
        const res = this.x + this.y;
        return res
    }
    sub() {
        const res = this.x - this.y;
        return res
    }
    pro() {
        const res = this.x * this.y;
        return res
    }
}

module.exports = Calculator;