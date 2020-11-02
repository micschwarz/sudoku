export class Sudoku {

    private readonly map: number[];

    constructor() {
        this.map = new Array(81).fill(0);
        this.solve(0);
    }

    public asMatrix(): number[][] {
        const matrix = [];

        for (let cell = 0; cell < 81; cell += 9) {
            matrix.push(this.map.slice(cell, cell + 9));
        }

        return matrix;
    }

    public asFlatMap(): number[] {
        return this.map;
    }

    private getRow(index: number): number[] {
        const firstCellInRow = index - index % 9;
        return this.map.slice(firstCellInRow, firstCellInRow + 9);
    }

    private getColumn(index: number): number[] {
        const firstCell = index % 9;
        const values: number[] = [];

        for (let cell = firstCell; cell < 81; cell += 9) {
            values.push(this.map[cell]);
        }

        return values;
    }

    public getFieldStartCell(index: number): number {
        const column = index % 9;
        const row = (index - column) / 9;

        const fieldColumn = column - (column % 3);
        const fieldRow = row - (row % 3);

        return fieldRow * 9 + fieldColumn;
    }

    private getField(index: number): number[] {
        const values: number[] = [];
        const startCell = this.getFieldStartCell(index);

        for (let row = startCell; row < index + 18; row += 9) {
            values.push(...this.map.slice(row, row + 3));
        }

        return values;
    }

    private getPossibleValues(index: number): number[] {
        const possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const row = this.getRow(index);
        const column = this.getColumn(index);
        const field = this.getField(index);

        return possibleValues
            .filter(number => !row.includes(number))
            .filter(number => !column.includes(number))
            .filter(number => !field.includes(number));
    }

    private solve(index: number) {
        if (index >= 81) {
            return true;
        }

        const possibleValues = this.getPossibleValues(index);
        const original = this.map[index];

        // Fisher-Yates shuffle algo
        for (let positionOriginal = possibleValues.length - 1; positionOriginal > 0; positionOriginal--) {
            const positionRandom = ~~(Math.random() * (positionOriginal + 1));
            [
                possibleValues[positionOriginal],
                possibleValues[positionRandom]
            ] = [
                possibleValues[positionRandom],
                possibleValues[positionOriginal]
            ];
        }

        for (const value of possibleValues) {
            this.map[index] = value;

            if (this.solve(index + 1)) {
                return true;
            }
        }

        this.map[index] = original;
        return false;
    }
}