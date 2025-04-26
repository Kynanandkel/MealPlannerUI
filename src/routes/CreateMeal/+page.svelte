<h1>Create Meal Page</h1>
<script lang="ts">
    import NavBar from "../navBar.svelte";

    import { onMount } from "svelte";

    import type {ingredient} from '../Types.ts';
    import type {meal} from '../Types.ts';
    import type {mealIngredient} from '../Types.ts'
    import { json } from "@sveltejs/kit";

    var Ingredients:ingredient[] = $state([])
    var searchIngredients:ingredient[] = $state([]);

    var MealIngredients:mealIngredient[] = $state([])

   

    const getIngredients = async() =>{
        const response = await fetch('http://localhost:8080/GetAllIngredients');
        Ingredients = await response.json();
        searchIngredients = Ingredients;
    }

    function searchIngredient(){
        
        searchIngredients  = [];
        let searchString = (<HTMLInputElement>document.getElementById("ingSearchBox")).value;

        if (!searchString){
            searchIngredients = Ingredients;
            return;
        }

        Ingredients.forEach(ingredient =>{
                if (ingredient.Name.toLowerCase().includes(searchString.toLowerCase())){
                    searchIngredients.push(ingredient);
                }
        })
    }

    const createMeal  = async() => {

        let mealName = (<HTMLInputElement>document.getElementById("mealType")).value;
        let mealType = (<HTMLInputElement>document.getElementById("mealType")).value;

        let meal:meal = {
            id: -1,
            name : mealName,
            mealIngredients : JSON.parse(JSON.stringify(MealIngredients)),
            type: mealType
        }

        const response = await fetch('http://localhost:8080/CreateMeal',{
            method: "POST",
            body: JSON.stringify(meal)
        });
    }

    function AddIngredientToMeal(index:number){

        let ingre:mealIngredient = {
            ingredientName: Ingredients[index].Name,
            ingredientId: Ingredients[index].id,
            mealId: -1,
            ammount:0,
            type:"item",
        }

        MealIngredients.push(JSON.parse(JSON.stringify(Ingredients[index])));
        
    }

    function RemoveIngredientFromMeal(){

    }
    
    function CreateMeal(){

    }

    onMount(()=>{
        getIngredients();
    })

    console.log($inspect(Ingredients))
</script>

<NavBar/>

<section class="container">
    <div class="containerBoxes">
        <h3>searh for ingredient</h3>
        <div class="row">
            <input id="ingSearchBox" oninput={()=>searchIngredient()} type="text" >
            <button onclick={()=>searchIngredient()} >search ingredient</button>
        </div>
        <div class="column">
            
            {#each searchIngredients as ingredient, index(index) }
                <div class="row">

                
                <p style="flex-grow: 2;">{ingredient.Name}</p>
                <button onclick={() => AddIngredientToMeal(index)}> add ingredient</button>
                </div>
                
            {/each}
        </div>
    </div>
    <div class="containerBoxes" style="flex-grow: 5;">
        <h3>Meal Ingredients</h3>
        <div class="row">
            <p>meal name</p>
            <input id="mealName" type="text">
            <p>meal type</p>
            <input id="mealType" type="meal Type">
        </div>
        <div class="column">
            {#each MealIngredients as ingredient, index(index) }
                <div class="row">

                
                <p>{ingredient.ingredientName} test</p>
                <button onclick={() => AddIngredientToMeal(index)}> remove ingredient</button>
                <input type="text" id="ingredientAmount">
                <select name="ingredientType" id="ingredientType">
                    <option value="Item">Item</option>
                    <option value="Tspn">Tspn</option>
                    <option value="Tbsp">Tbsp</option>
                    <option value="Cup">Cup</option>
                    <option value="Gram">Gram</option>
                    <option value="Kilo">Kilo</option>
                    <option value="Ml">Ml</option>
                    <option value="Litre">Litre</option>

                </select>
                

                </div>
                
            {/each}
        </div>
        <div class="row">
            <button>save meal</button>
        </div>

    </div>
</section>

    
<style>	
    @import '../style.css';
</style>