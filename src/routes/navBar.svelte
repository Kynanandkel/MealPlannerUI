<div class="navBar">
    <a href="." >home</a>
    <a href="CreateMeal" >Create New Meal</a>
    <a href="CreateIngredient" >Create New Ingredient</a>
</div>

<style>
    .navBar{
        
        display: flex;
        flex-flow: row;
        justify-content: center;
    }

    a{
        background-color: red;
        color: white;
        margin: 3px;
        padding: 3px;
        text-decoration: none;
        position: relative;
        border: solid;
        border-color: red;
        border-width: 2px;
        font-family: 'Courier New', Courier, monospace;
        text-transform: uppercase;
    }

    a:hover{
        
        background-color: white;
        color: red;
        cursor: pointer;
    }

    a:active{
        top: 2px;
    }
</style>