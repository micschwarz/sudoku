/**
 * Sudoku gamemap.
 */
export class Map {
    /**
     * Cells of sudoku game.
     * @private
     */
    private readonly cells: number[] = Array(81).fill(undefined);

    /**
     * Get value of given cell.
     * @param cell Index of cell to get value from.
     * @return Value of cell.
     */
    public get(cell: number): number {
        return this.cells[cell];
    }

    /**
     * Set value of given cell.
     * @param cell Index of cell to set value to.
     * @param value Value to set cell to.
     */
    public set(cell: number, value: number): void {
        this.cells[cell] = value;
    }

    /**
     * Clear given cell.
     * @param cell Index of cell to reset.
     * @return Previous value of cell.
     */
    public clear(cell: number): number {
        const oldValue = this.get(cell);
        this.set(cell, undefined);
        return oldValue;
    }

    /**
     * Get full row that contains given cell.
     * @param cell Index of cell that is included in the row to get.
     * @return Full row that contains cell.
     */
    public getRow(cell: number): number[] {
        const firstCellInRow = cell - cell % 9;
        return this.cells.slice(firstCellInRow, firstCellInRow + 9);
    }

    /**
     * Get full column that contains given cell.
     * @param cell Index of cell that is included in the column to get.
     * @return Full column that contains cell.
     */
    public getColumn(cell: number): number[] {
        const firstCell = cell % 9;
        const values: number[] = [];

        for (let cell = firstCell; cell < 81; cell += 9) {
            values.push(this.get(cell));
        }

        return values;
    }

    /**
     * Get full 3x3 field that contains given cell.
     * @param cell Index of cell that is included in the field to get.
     * @return Full field that contains cell.
     */
    public getField(cell:number): number[] {
        const values: number[] = [];
        const startCell = this.getFieldStartCell(cell);

        for (let row = startCell; row < cell + 18; row += 9) {
            values.push(...this.cells.slice(row, row + 3));
        }

        return values;
    }

    /**
     * Get index of the cell that is the most top-left of the field that contains the given cell.
     * @param cell Index of cell that is in the field of which the most top-left cell will be returned.
     * @return Index of the most top-left cell of the field that contains cell.
     */
    public getFieldStartCell(cell: number): number {
        const column = cell % 9;
        const row = (cell - column) / 9;

        const fieldColumn = column - (column % 3);
        const fieldRow = row - (row % 3);

        return fieldRow * 9 + fieldColumn;
    }

    /**
     * Get index of a random filled cell.
     * @return Index of a random filled cell.
     */
    public getRandomFilledCellIndex(): number {
        const cellsFull = Object.keys(this.cells)
            .map(cell => parseInt(cell))
            .filter(cell => !!this.cells[cell]);

        return cellsFull[~~(Math.random() * cellsFull.length)];
    }

    /**
     * Get map as flat array.
     * @returns Map as flat array.
     */
    public asArray(): number[] {
        return this.cells;
    }
}