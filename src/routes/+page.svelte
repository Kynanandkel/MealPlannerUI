<script lang="ts">
    import { get } from "svelte/store";
	import {onMount} from 'svelte';

    import NavBar from "./navBar.svelte";

	type mealIngredient = {
		mealId: number;
		ingredientId: number;
		ingredientName: string;
		ammount: number;
		type: string
	}

	type meal = {
		id: number;
		name: string;
		type: string;
		mealIngredients: mealIngredient[]
	}
	
	var Meals:meal[] = $state([]);
	var SerachMeals:meal[]  = $state([]);
	var ChoseMeals:meal[] = $state([]);
	var ShoppingList:mealIngredient[] = $state([]);

	const getMeals = async() =>{
		const response = await fetch('http://localhost:8080/GetAllMeals');
		Meals = await response.json();
	}

	function serachMeals(){
		var searchString = (<HTMLInputElement>document.getElementById('mealSearch')).value
		SerachMeals.length = 0;
			Meals.forEach(meal => {
				if(meal.name.toLowerCase().includes(searchString.toLowerCase())){
					SerachMeals.push(meal);
				}
			});
	}

	function selectMeal(mealIndex:number){
		ChoseMeals.push(Meals[mealIndex]);
		console.log($state.snapshot(Meals[mealIndex]))
		updateShoppingList();
	}

	function updateShoppingList(){
		ShoppingList.length = 0;
		console.log($state.snapshot(ShoppingList));
		
		ChoseMeals.forEach((meal)=>{
			console.log(ShoppingList.length)
			if(ShoppingList.length === 0){
				ShoppingList = JSON.parse(JSON.stringify(meal.mealIngredients));
			}else{
				meal.mealIngredients.forEach(ingredient => {
					var indexOfIng = ShoppingList.map( e => e.ingredientId ).indexOf(ingredient.ingredientId);
					console.log($state.snapshot(ingredient));
					console.log($state.snapshot(ShoppingList));
					if (indexOfIng === -1){
						ShoppingList.push(ingredient);
					}else if(ingredient.type == ShoppingList[indexOfIng].type){
						ShoppingList[indexOfIng].ammount += ingredient.ammount;
					}else{
						var foundIng:boolean = false;
						while (indexOfIng != -1){
							indexOfIng = ShoppingList.indexOf(ingredient,indexOfIng+1);
							if(indexOfIng != -1){
								if(ingredient.type == ShoppingList[indexOfIng].type){
									ShoppingList[indexOfIng].ammount += ingredient.ammount;	
									foundIng = true;
									indexOfIng = -1;
								}
								
							}
						}
						if(!foundIng){
							ShoppingList.push(ingredient);
						}
					}
				});
			}
		})
	}

	function removeMeal(mealIndex:number){
		ChoseMeals.splice(mealIndex,1)
		updateShoppingList();
	}
	

	onMount(() => {
		getMeals();
		
	})
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1>
	Meal Planner Application
</h1>

<NavBar />

<section class="container">
	
	<div class="containerBoxes">
		<h3>search for meals</h3>
		<div class="row">
			<input id="mealSearch" class="listItem" oninput={() => serachMeals()}>
			<button class="listItem" onclick={() => serachMeals()}> search </button>
		</div>
		<div id="mealList" class="column">
			{#each SerachMeals as meal, index (index)}
			<div class="row"> 
				<p>{meal.name}</p>
				<button onclick={() => selectMeal(index)}>add meal</button>
			</div>
			{/each}
		</div>
		
		
	</div>

	<div class="containerBoxes">
		<h3> selected meals</h3>
		<div class="containerBoxItem">
			{#each ChoseMeals as meal, index (index)}
			<div class="row"> 
				<p>{meal.name}</p>
				<button onclick={() => removeMeal(index)}>remove meal</button>
			</div>
			{/each}
		</div>
	</div>

	<div class="containerBoxes">
		<h3>shopping list</h3>
		<div class="column">
			{#each ShoppingList as ingredient, index (index)}
			
				<p>{ingredient.ingredientName}  {ingredient.ammount}  {ingredient.type}</p>
			
			{/each}

		</div>
		
	</div>
</section>

<style>
	

	h1,h3{
		text-align: center;
	 	color: red;
		font-family:'Courier New', Courier, monospace;
	}

	

	.container{
		display: flex;
		flex-flow: row;
		height: 70vh;
		margin: 0dvh 5dvh 0dvh 5dvh;
	}

	.containerBoxes{
		flex-grow: 1;
		border: solid;
		border-width: 2px;
		border-color: red;
		display: flex;
		flex-flow: column;
		margin: 0.5dvh;
	}

	.column{
		display: flex;
		flex-flow: column;
		margin: 1%;
		overflow: auto;
		flex-grow: 1;
	}

	.row{
		display: flex;
		flex-flow: row;
		width: 100%;
		align-items: center;
		
		
	}

	input{
		align-self: auto;
		margin: 5px;
		flex-grow: 3;
		color: red;
		border: solid;
		border-width: 2px;
		border-color: red;
		font-family: 'Courier New', Courier, monospace;
		outline: none;
	}

	button{
		position: relative;
		margin: 5px;
		border-radius: 0;
		color: white;
		background-color: red;
		border: solid;
		border-color: red;
		border-width: 2px;
		font-family:'Courier New', Courier, monospace;

	}

	button:active{
		color: red;
		background-color: white;
		top: 2px;
	}

	button:hover{
		color: red;
		background-color: white;
	}


	


</style>
