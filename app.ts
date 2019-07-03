import * as readline from 'readline';

class Vector2D {
    private x: number;
    private y: number;
    constructor(x?: number, y?: number) {
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
class Prop extends Vector2D {
    private propString = "■"
    getPropString(): string {
        return this.propString
    }
    setPropString(str: string) {
        this.propString = str
    }
}
class Field {
    size: Vector2D = new Vector2D(Math.floor(process.stdout.columns / 2), process.stdout.rows - 1);
    props: Prop[] = [];
    worldTileString: string = "　";
    pushProp(prop: Prop) {
        this.props.push(prop)
    }
    getFieldSize(): Vector2D {
        return this.size;
    }
    clampVector2D(vector2D: Vector2D): Vector2D {
        if (vector2D.getX() > this.size.getX() - 1)
            vector2D.setX(this.size.getX() - 1)
        else if (vector2D.getX() < 0)
            vector2D.setX(0)
        if (vector2D.getY() > this.size.getY() - 1)
            vector2D.setY(this.size.getY() - 1)
        else if (vector2D.getY() < 0)
            vector2D.setY(0)
        return vector2D
    }
    render(): any[] {
        var array = []
        for (var y = 0; y < this.size.getY(); y++) {
            array.push([]);
            for (var x = 0; x < this.size.getX(); x++) {
                array[y].push(this.worldTileString);
            }
        }
        this.props.forEach((prop: Prop) => {
            var clampVector2D = this.clampVector2D(prop)
            array[clampVector2D.getY()][clampVector2D.getX()] = prop.getPropString()
        });
        return array
    }
}
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