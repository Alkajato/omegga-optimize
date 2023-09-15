type Vector3Like = [number, number, number];

export default class Vector3 {
    public 0: number;
    public 1: number;
    public 2: number;

    constructor(x: number, y: number, z: number) {
        this[0] = x;
        this[1] = y;
        this[2] = z;
    }

    //Logic

    public static isEquals(firstVector: Vector3 | Vector3Like, secondVector: Vector3 | Vector3Like): boolean {
        return firstVector[0] === secondVector[0] && firstVector[1] === secondVector[1] && firstVector[2] === secondVector[2];
    }

    public isEquals(secondVector: Vector3 | Vector3Like): boolean {
        return this[0] === secondVector[0] && this[1] === secondVector[1] && this[2] === secondVector[2];
    }

    public static isLessThan(firstVector: Vector3 | Vector3Like, secondVector: Vector3 | Vector3Like): boolean {
        return firstVector[0] < secondVector[0] && firstVector[1] < secondVector[1] && firstVector[2] < secondVector[2];
    }

    public isLessThan(secondVector: Vector3 | Vector3Like): boolean {
        return this[0] < secondVector[0] && this[1] < secondVector[1] && this[2] < secondVector[2];
    }

    public static isGreaterThan(firstVector: Vector3 | Vector3Like, secondVector: Vector3 | Vector3Like): boolean {
        return firstVector[0] > secondVector[0] && firstVector[1] > secondVector[1] && firstVector[2] > secondVector[2];
    }

    public isGreaterThan(secondVector: Vector3 | Vector3Like): boolean {
        return this[0] > secondVector[0] && this[1] > secondVector[1] && this[2] > secondVector[2];
    }

    public static isLessThanEquals(firstVector: Vector3 | Vector3Like, secondVector: Vector3 | Vector3Like): boolean {
        return firstVector[0] <= secondVector[0] && firstVector[1] <= secondVector[1] && firstVector[2] <= secondVector[2];
    }

    public isLessThanEquals(secondVector: Vector3 | Vector3Like): boolean {
        return this[0] <= secondVector[0] && this[1] <= secondVector[1] && this[2] <= secondVector[2];
    }

    public static isGreaterThanEquals(firstVector: Vector3 | Vector3Like, secondVector: Vector3 | Vector3Like): boolean {
        return firstVector[0] >= secondVector[0] && firstVector[1] >= secondVector[1] && firstVector[2] >= secondVector[2];
    }

    public isGreaterThanEquals(secondVector: Vector3 | Vector3Like): boolean {
        return this[0] >= secondVector[0] && this[1] >= secondVector[1] && this[2] >= secondVector[2];
    }

    //Arithmetic

    public static add(firstVector: Vector3 | Vector3Like, secondVector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(firstVector[0] + secondVector[0], firstVector[1] + secondVector[1], firstVector[2] + secondVector[2]);
    }

    public add(vector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(this[0] + vector[0], this[1] + vector[1], this[2] + vector[2]);
    }

    public static sub(firstVector: Vector3 | Vector3Like, secondVector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(firstVector[0] - secondVector[0], firstVector[1] - secondVector[1], firstVector[2] - secondVector[2]);
    }

    public sub(vector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(this[0] - vector[0], this[1] - vector[1], this[2] - vector[2]);
    }

    public static mul(firstVector: Vector3 | Vector3Like, secondVector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(firstVector[0] * secondVector[0], firstVector[1] * secondVector[1], firstVector[2] * secondVector[2]);
    }

    public mul(vector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(this[0] * vector[0], this[1] * vector[1], this[2] * vector[2]);
    }

    public static div(firstVector: Vector3 | Vector3Like, secondVector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(firstVector[0] / secondVector[0], firstVector[1] / secondVector[1], firstVector[2] / secondVector[2]);
    }

    public div(vector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(this[0] / vector[0], this[1] / vector[1], this[2] / vector[2]);
    }

    public static remainder(firstVector: Vector3 | Vector3Like, secondVector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(firstVector[0] % secondVector[0], firstVector[1] % secondVector[1], firstVector[2] % secondVector[2]);
    }

    public remainder(vector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(this[0] % vector[0], this[1] % vector[1], this[2] % vector[2]);
    }

    public static mod(firstVector: Vector3 | Vector3Like, secondVector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(
            firstVector[0] - Math.floor(firstVector[0] / secondVector[0]) * secondVector[0],
            firstVector[1] - Math.floor(firstVector[1] / secondVector[1]) * secondVector[1],
            firstVector[2] - Math.floor(firstVector[2] / secondVector[2]) * secondVector[2]
        );
    }

    public mod(vector: Vector3 | Vector3Like): Vector3 {
        return new Vector3(
            this[0] - Math.floor(this[0] / vector[0]) * vector[0],
            this[1] - Math.floor(this[1] / vector[1]) * vector[1],
            this[2] - Math.floor(this[2] / vector[2]) * vector[2]
        );
    }

    //Common Math

    public static trunc(vector: Vector3 | Vector3Like) {
        return new Vector3(Math.trunc(vector[0]), Math.trunc(vector[1]), Math.trunc(vector[2]));
    }

    public trunc() {
        return new Vector3(Math.trunc(this[0]), Math.trunc(this[1]), Math.trunc(this[2]));
    }

    public static floor(vector: Vector3 | Vector3Like) {
        return new Vector3(Math.floor(vector[0]), Math.floor(vector[1]), Math.floor(vector[2]));
    }

    public floor() {
        return new Vector3(Math.floor(this[0]), Math.floor(this[1]), Math.floor(this[2]));
    }

    public static round(vector: Vector3 | Vector3Like) {
        return new Vector3(Math.round(vector[0]), Math.round(vector[1]), Math.round(vector[2]));
    }

    public round() {
        return new Vector3(Math.round(this[0]), Math.round(this[1]), Math.round(this[2]));
    }

    public static ceil(vector: Vector3 | Vector3Like) {
        return new Vector3(Math.ceil(vector[0]), Math.ceil(vector[1]), Math.ceil(vector[2]));
    }

    public ceil() {
        return new Vector3(Math.ceil(this[0]), Math.ceil(this[1]), Math.ceil(this[2]));
    }
}
