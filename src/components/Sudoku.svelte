<script lang="ts">
    import type {Sudoku} from "../sudoku/Sudoku";

    export let sudoku: Sudoku;
    $: sudokuMap = sudoku?.getMap().asArray() || [];
</script>

<div class="sudoku">
    {#each sudokuMap as content, cell (cell)}
        <div class="cell" class:cell--field-even={sudoku.getMap().getFieldStartCell(cell) % 2 === 0}>{content || ""}</div>
    {/each}
</div>

<style>
    :root {
        /* Subtract 2px for border */
        --sudoku-cell-size: calc((var(--app-width) - 2rem - 2px) / 9);
    }

    .sudoku {
        display: grid;
        width: calc(var(--sudoku-cell-size) * 9 + 2px);
        grid-template-columns: repeat(9, var(--sudoku-cell-size));
        grid-template-rows: repeat(9, var(--sudoku-cell-size));
        border: 1px solid #4A5568;
    }

    .sudoku .cell {
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        justify-content: center;
        text-align: center;
        border: 1px solid #4A5568;

        background: #F7FAFC;
    }

    .sudoku .cell.cell--field-even {
        background: #CBD5E0;
    }
</style>