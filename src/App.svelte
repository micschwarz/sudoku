<script lang="ts">
    import {Sudoku} from "./sudoku/Sudoku";
    import SudokuView from "./components/Sudoku.svelte";

    let sudoku: Sudoku = new Sudoku();
</script>

<main>
    <SudokuView sudoku={sudoku}/>
</main>

<style>
    main {
        width: var(--app-width);
        height: 100vh;

        margin: 0 auto;

        padding: 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
</style>