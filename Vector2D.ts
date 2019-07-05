export class Vector2D {
    private x: number;
    private y: number;
    constructor(x ? : number, y ? : number) {
        this.x = x || 0
        this.y = y || 0
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
    setX(x: number) {
        this.x = x
    }
    setY(y: number) {
        this.y = y
    }
    setVector2D(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Prop extends Vector2D {
    private propString = "■"
    getPropString(): string {
        return this.propString
    }
    setPropString(str: string) {
        this.propString = str
    }
}