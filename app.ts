import * as readline from 'readline';
import { Vector2D, Prop } from './Vector2D'
import { Field } from './Field'

class Render {
    static show2DArray(arr: any[]) {
        readline.cursorTo(process.stdout, 0, 0)
        var buf = ""
        arr.forEach(y => {
            buf += y.join('') + "\n"
        })
        process.stdout.write(buf)
    }
}
interface Key {
    sequence: string
    name: string
    ctrl: boolean
    meta: boolean
    shift: boolean
}
var i = 0;
var velocity = 5;
var field = new Field()
var arr1: Prop[] = [];
var arr2: Prop[] = [];
for (var i = 0; i < 900; i++) {
    var tmp1 = new Prop()
    arr1.push(tmp1)
    field.pushProp(tmp1)

    var tmp2 = new Prop()
    arr2.push(tmp2)
    field.pushProp(tmp2)
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str: string, key: Key) => {
    if (key.ctrl && key.name === 'c') process.exit()
    if (key.name == "up")
        velocity += 1
    if (key.name == "down")
        velocity -= 1
})
process.stdout.on('resize', () => {
    field.size = new Vector2D(Math.floor(process.stdout.columns / 2), process.stdout.rows - 1);
})

setInterval(() => {
    arr1.forEach((prop: Prop, index: number) => {
        prop.setX(Math.floor((field.size.getX() / 2 / (index * 0.01)) * Math.cos((index * 2 + i) * (Math.PI / 180)) + (field.size.getX() / 2)))
        prop.setY(Math.floor((field.size.getY() / 2 / (index * 0.01)) * Math.sin((index * 2 + i) * (Math.PI / 180)) + (field.size.getY() / 2)))
    })
    arr2.forEach((prop: Prop, index: number) => {
        prop.setX(Math.floor((field.size.getX() / 2 / (index * 0.01)) * Math.cos((index * 2 - i) * (Math.PI / 180)) + (field.size.getX() / 2)))
        prop.setY(Math.floor((field.size.getY() / 2 / (index * 0.01)) * Math.sin((index * 2 - i) * (Math.PI / 180)) + (field.size.getY() / 2)))
    })
    Render.show2DArray(field.render())
    i += velocity
}, 1000 / 60)