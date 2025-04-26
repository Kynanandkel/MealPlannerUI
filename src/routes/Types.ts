

    export type mealIngredient = {
        mealId: number;
        ingredientId: number;
        ingredientName: string;
        ammount: number;
        type: string
    }

    export type meal = {
        id: number;
        name: string;
        type: string;
        mealIngredients: mealIngredient[]
    }

    export type ingredient = {
        id:number,
        Name:string,
        type:string
    }
