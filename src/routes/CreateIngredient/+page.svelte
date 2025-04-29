<script lang='ts'>
    import { onMount } from "svelte";
    import NavBar from "../navBar.svelte";

    import type {ingredient} from '../Types.ts';

    var ingr:ingredient = $state({id:-1, Name:"",type:"Item"});

    
    const CreateIngredient = async()=>{

        console.log("test")

        const response = await fetch('http://localhost:8080/CreateIngredient',{
            method: "POST",
            body: JSON.stringify(ingr)
        });

        location.reload();

    }

</script>
<h1>Create ingredient Page</h1>
<NavBar/>

<section class="container">
    <div class="column">
        <div class="row">
            <p>ingredient Name</p>
            <input type="text" bind:value={ingr.Name}/>
        </div>
        <div class="row">
            <p>ingredient type</p>
        <select bind:value={ingr.type} name="ingredientType" id="ingredientType">
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
        <div class="row">
            <button onclick={()=>CreateIngredient()}> CREATE INGREDIENT</button>
        </div>
    </div>


</section>


<style>	
    @import '../style.css';
</style>