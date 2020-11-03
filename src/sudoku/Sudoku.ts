import {Map} from "./Map";

/**
 * Sudoku gameboard.
 */
export class Sudoku {
    /**
     * Sudoku map.
     * @private
     */
    private readonly map: Map = new Map();

    /**
     * Generates a valid sudoku board.
     */
    constructor() {
        this.generate(40);
    }

    /**
     * Get sudoku map.
     * @return Sudoku map.
     */
    public getMap(): Map {
        return this.map;
    }

    /**
     * Get possible values for cell.
     * @param cell Index of cell to get possible values for.
     * @return Possible Values for given cell.
     * @private
     */
    private getPossibleValues(cell: number): number[] {
        const possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const row = this.map.getRow(cell);
        const column = this.map.getColumn(cell);
        const field = this.map.getField(cell);

        return possibleValues
            .filter(number => !row.includes(number))
            .filter(number => !column.includes(number))
            .filter(number => !field.includes(number));
    }

    /**
     * Solve the sudoku.
     * @param index Index of cell to start with.
     * @param forbiddenIndex Index of cell that is not allowed to contain forbiddenValue.
     * @param forbiddenValue Value that is forbidden to be used for a given cell.
     * @return Whether the game is solvable or not.
     * @private
     */
    private solve(index: number, forbiddenIndex: number = undefined, forbiddenValue: number = undefined): boolean {
        if (index >= 81) {
            return true;
        }

        const possibleValues = this.getPossibleValues(index)
            .filter(number => forbiddenIndex === undefined || number !== forbiddenValue);

        const original = this.map.get(index);

        // Fisher-Yates shuffle algorithm
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
            this.map.set(index, value);

            if (this.solve(index + 1, forbiddenIndex, forbiddenValue)) {
                return true;
            }
        }

        this.map.set(index, original);
        return false;
    }

    /**
     * Generate sudoku board.
     * @param amountCellsToRemove Amount of cells to be empty.
     * @private
     */
    private generate(amountCellsToRemove: number): void {
        this.solve(0);

        for (let amountToRemove = amountCellsToRemove; amountToRemove > 0; amountToRemove--) {
            this.removeRandomCell();
        }
    }

    /**
     * Removes a random cell from the board.
     * Keeps the board solvable.
     * @private
     */
    private removeRandomCell(): void {
        while (true) {
            // Remove random cell
            const cell = this.map.getRandomFilledCellIndex();
            const value = this.map.clear(cell);

            // Check if board still solvable
            if (!this.solve(0, cell, value)) {
                return;
            }

            // Reset map
            this.map.set(cell, value);
        }
    }
}