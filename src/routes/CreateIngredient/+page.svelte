<script lang='ts'>
    import { onMount } from "svelte";
    import NavBar from "../navBar.svelte";

    import type {ingredient} from '../Types.ts';
    import type {meal} from '../Types.ts';
    import type {mealIngredient} from '../Types.ts'

    var Ingredients:ingredient[] = $state([])

    var MealIngredients:mealIngredient[] = $state([])

    var Meal:meal

    const getIngredients = async() =>{
        const response = await fetch('http://localhost:8080/GetAllIngredients');
        Ingredients = await response.json();
    }
    
    function CreateMeal(){

    }

    onMount(()=>{
        getIngredients();
    })
</script>
<h1>Create ingredient Page</h1>
<NavBar/>

<section class="container">


</section>


<style>	
    @import '../style.css';
</style>