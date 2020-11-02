<script lang="ts">
    import {Sudoku} from "./sudoku/Sudoku";

    let sudoku: Sudoku = new Sudoku();
    $: sudokuMap = sudoku.asFlatMap();
</script>

<main>
    <div class="sudoku">
        {#each sudokuMap as content, cell (cell)}
            <div class="cell" class:cell--field-even={sudoku.getFieldStartCell(cell) % 2 === 0}>{content}</div>
        {/each}
    </div>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;

        padding: 2rem;

        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .sudoku {
        display: grid;
        grid-template-columns: repeat(9, 2rem);
        grid-template-rows: repeat(9, 2rem);
        border: 1px solid #4A5568;
    }

    .sudoku .cell {
        display: flex;
        align-content: center;
        justify-content: center;
        border: 1px solid #4A5568;
        padding: .4rem;

        background: #F7FAFC;
    }

    .sudoku .cell.cell--field-even {
        background: #CBD5E0;
    }
</style>