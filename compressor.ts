import { Brick, BrickV10, ReadSaveObject, Vector } from 'omegga'

export enum Mergable {
    Default = "PB_DefaultBrick",
    Micro = "PB_DefaultMicroBrick",
}

export function vectorsEqual(a: Vector, b: Vector): boolean {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

export default class BrickMerger {
    // Correct the orientation and rotation of a brick for ease of compression.
    // Positive X in size should be positive X in positional space.
    // Positive Y in size should be positive Y in positional space.
    // Positive Z in size should be positive Z in positional space.
    public static correct(brick: Brick) {
        let brickSize = brick.size;

        // To change X size in world-space modify:
        // Rot(0) Size(X)
        // Rot(1) Size(Y)
        // Rot(2) Size(X)
        // Rot(3) Size(Y)

        // To change Y size in world-space modify:
        // Rot(0) Size(Y)
        // Rot(1) Size(X)
        // Rot(2) Size(Y)
        // Rot(3) Size(X)
        if (brick.rotation === 1 || brick.rotation === 3) {
            [brickSize[0], brickSize[1]] = [brickSize[1], brickSize[0]];
            brick.rotation = 0;
        }
    }

    public static canMerge(brick: [Brick, Mergable], other: [Brick, Mergable]): boolean {
        const componentsPresent = BrickMerger.hasComponents(brick[0]) || BrickMerger.hasComponents(other[0])
        const incompatibleDirection = brick[0].direction != other[0].direction
        const differentColors = brick[0].color !== other[0].color
        if (componentsPresent || incompatibleDirection || differentColors || brick[1] != other[1])
            return false;

        let count = 0;
        for (const corner of this.brickCorners(brick[0])) {
            for (const otherCorner of this.brickCorners(other[0])) {
                const equal = vectorsEqual(corner, otherCorner)

                if (equal)
                    count += 1
            }
        }

        return count >= 4
    }

    // Return real-world coordinates for the corners of the brick.
    public static brickCorners(brick: Brick) {
        let [scaleX, scaleY, scaleZ]: Vector = brick.size
        let [posX, posY, posZ]: Vector = brick.position

        // Top and bottom quadrant-corners.
        const topQ1: Vector = [posX + (-scaleX), posY + scaleY, posZ + scaleZ]
        const topQ2: Vector = [posX + scaleX, posY + scaleY, posZ + scaleZ]
        const topQ3: Vector = [posX + (-scaleX), posY + (-scaleY), posZ + scaleZ]
        const topQ4: Vector = [posX + scaleX, posY + (-scaleY), posZ + scaleZ]

        const bottomQ1: Vector = [posX + (-scaleX), posY + scaleY, posZ + (-scaleZ)]
        const bottomQ2: Vector = [posX + scaleX, posY + scaleY, posZ + (-scaleZ)]
        const bottomQ3: Vector = [posX + (-scaleX), posY + (-scaleY), posZ + (-scaleZ)]
        const bottomQ4: Vector = [posX + scaleX, posY + (-scaleY), posZ + (-scaleZ)]

        return [topQ1, topQ2, topQ3, topQ4, bottomQ1, bottomQ2, bottomQ3, bottomQ4]
    }


    // Returns if brick has any components.
    public static hasComponents(brick: Brick) {
        brick = brick as BrickV10
        const components = brick.components

        return components.BCD_AudioEmitter != undefined || components.BCD_Interact != undefined || components.BCD_ItemSpawn != undefined || components.BCD_PointLight != undefined || components.BCD_SpotLight != undefined
    }

    private static distance(first: Vector, other: Vector) {
        return Math.sqrt((other[0] - first[0]) + (other[1] - first[1]) + (other[2] - first[2]))
    }

    private static distanceVector(first: Vector, other: Vector) {
        const dx = Math.abs(other[0] - first[0])
        const dy = Math.abs(other[1] - first[1])
        const dz = Math.abs(other[2] - first[2])
        return [dx, dy, dz]
    }
}