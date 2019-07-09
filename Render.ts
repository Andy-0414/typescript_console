import * as readline from 'readline';
import { Vector2D, Prop } from './Vector2D'
import { Field } from './Field';
interface Key {
    sequence: string
    name: string
    ctrl: boolean
    meta: boolean
    shift: boolean
}

export class Render {
    velocity = 5
    arr1: Prop[]
    arr2: Prop[]
    i: number = 0
    field = new Field()
    static render: Render = new Render()
    keyEvent = (str: string, key: Key) => {
        if (key.ctrl && key.name === 'c') process.exit()
        if (key.name == "up")
            this.velocity += 1
        if (key.name == "down")
            this.velocity -= 1
    }
    loop = () => {
        this.arr1.forEach((prop: Prop, index: number) => {
            prop.setX(Math.floor((this.field.size.getX() / 2 / (index * 0.01)) * Math.cos((index * 2 + this.i) * (Math.PI / 180)) + (this.field.size.getX() / 2)))
            prop.setY(Math.floor((this.field.size.getY() / 2 / (index * 0.01)) * Math.sin((index * 2 + this.i) * (Math.PI / 180)) + (this.field.size.getY() / 2)))
        })
        this.arr2.forEach((prop: Prop, index: number) => {
            prop.setX(Math.floor((this.field.size.getX() / 2 / (index * 0.01)) * Math.cos((index * 2 - this.i) * (Math.PI / 180)) + (this.field.size.getX() / 2)))
            prop.setY(Math.floor((this.field.size.getY() / 2 / (index * 0.01)) * Math.sin((index * 2 - this.i) * (Math.PI / 180)) + (this.field.size.getY() / 2)))
        })
        Render.show2DArray(this.field.render())
        this.i += this.velocity
    }
    constructor() {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', this.keyEvent)
        process.stdout.on('resize', () => {
            this.field.size = new Vector2D(Math.floor(process.stdout.columns / 2), process.stdout.rows - 1);
        })

    }
    init() {
        var i = 0;
        this.arr1 = [];
        this.arr2 = [];
        for (var i = 0; i < 900; i++) {
            var tmp1 = new Prop()
            this.arr1.push(tmp1)
            this.field.pushProp(tmp1)

            var tmp2 = new Prop()
            this.arr2.push(tmp2)
            this.field.pushProp(tmp2)
        }

        setInterval(this.loop, 1000 / 60)
    }
    static getRenderInstance(): Render {
        return this.render
    }
    static show2DArray(arr: any[]) {
        readline.cursorTo(process.stdout, 0, 0)
        var buf = ""
        arr.forEach(y => {
            buf += y.join('') + "\n"
        })
        process.stdout.write(buf)
    }
}