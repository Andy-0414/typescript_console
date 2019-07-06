import { Vector2D, Prop } from './Vector2D'
export class Field {
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