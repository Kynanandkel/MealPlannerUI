<script lang="ts">
    import { get } from "svelte/store";
	import {onMount} from 'svelte';

    import NavBar from "./navBar.svelte";

	import type {mealIngredient} from './Types.ts';
	import type {meal} from './Types.ts';

	
	var Meals:meal[] = $state([]);
	var SerachMeals:meal[]  = $state([]);
	var ChoseMeals:meal[] = $state([]);
	var ShoppingList:mealIngredient[] = $state([]);

	const getMeals = async() =>{
		const response = await fetch('http://localhost:8080/GetAllMeals');
		Meals = await response.json();
		SerachMeals = Meals
	}

	function serachMeals(){
		var searchString = (<HTMLInputElement>document.getElementById('mealSearch')).value;

		if (!searchString){
			SerachMeals = Meals;
			return;
        }

		SerachMeals = [];

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
	@import 'style.css';
</style>