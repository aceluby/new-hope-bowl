import {Component} from "@angular/core";
@Component({
  selector: 'italian-pie-shoppe-component',
  templateUrl: './italian-pie-shoppe.component.html'
})

export class ItalianPieShoppeComponent {

  menu = MENU;
  appetizers = APPETIZERS;
  saladWraps = SALADS;
  sandwiches = SANDWICHES;
  burgers = BURGERS;
  buildYourOwnPizza = BUILD_YOUR_OWN_PIZZA;
  deepDishSpecialties = DEEP_DISH_SPECIALTIES;
  thinCrustSpecialties = THIN_CRUST_SPECIALTIES;
  selectedMenu = 'Italian Pie Shoppe';

  selectMenuItem(item : string) {
    this.selectedMenu = item;
  }
}

const MENU : string[] = [
  "Italian Pie Shoppe",
  "Appetizers",
  "Salads/Wraps",
  "Pizza",
  "Sandwiches",
  "Burgers",
  "Specials"
]

export class FoodItem {
  name : string;
  price : string;
  description : string;
  img : string;
}

export class Pizza {
  name : string;
  sizeAndPrice : PizzaSizePrice[];
  description : string;
  img : string;
}

export class PizzaSizePrice {
  size : string;
  price : string;
  extraToppings : string;
}

const APPETIZERS : FoodItem[] = [
  {name: "Italian Fries w/ Cheese", price : "$8.00", description : "Add ingredients to your Italian Fries for $0.75", img:"../../assets/italian_fries.jpg"},
  {name: "Brocchi", price : "$9.00", description : "Italian Fries with broccoli, melted cheddar and mozzarella cheese.", img: null},
  {name: "Big Dipper", price : "$7.00", description : "Hot Vienna loaf topped with melted mozzarella cheese and freshly chopped garlic. Served with a side of marinara sauce. (Add $0.75 per additional topping)", img: "../../assets/big_dipper.jpg"},
  {name: "Spinacchi", price : "$8.00", description : "Hot Vienna loaf topped with spinach, freshly chopped garlic, and melted mozzarella cheese. Served with a side of sauce.", img: null},
  {name: "Little Dipper", price : "$4.00", description : "Add $0.50 per additional topping..", img: null},
  {name: "Garlic Bread", price : "$4.00", description : "Fresh garlic butter on a hot Vienna loaf.", img: "../../assets/garlic_bread.jpg"},
  {name: "Chicken Wings (10)", price : "$9.00", description : "Deep fried with your choice of bone-in or boneless. Served with buffalo sauce, ranch, honey mustard, or BBQ sauce. Additional sides are $0.60", img: "../../assets/chicken_wings.jpeg"},
  {name: "Chicken Strips (6)", price : "$6.00", description : "Served with BBQ, Honey Mustard, or Ranch. Add $1.25 for a basket.", img: "../../assets/chicken_strips.jpg"},
  {name: "Cheese Sticks", price : "$8.00", description : "Six deep-fried sticks of breaded mozzarella cheese served with a side of marinara sauce for dipping", img: "../../assets/cheese_sticks.jpg"},
  {name: "Onion Rings (12)", price : "$6.00", description : "Deep-fried breaded onion rings", img: "../../assets/onion_rings.jpg"},
  {name: "French Fries (Small)", price : "$3.00", description : "Regular cut, waffle cut, and wedge cut are available", img: null},
  {name: "French Fries (Large)", price : "$5.00", description : "Regular cut, waffle cut, and wedge cut are available", img: null},
]

const SALADS : FoodItem[] = [
  {name: "Godfather Salad", price : "$9.00", description : "We will make a salad you can not refuse! Crisp green lettuce topped with pepperoni, ham, salami, cheese, green peppers, tomato, and green olives. Served with a choice of dressing* and a Vienna loaf", img: "../../assets/godfather_salad.jpg"},
  {name: "Dinner Salad", price : "$4.00", description : "Light and refreshing, garden fresh", img: "../../assets/dinner_salad.jpg"},
  {name: "Caesar Salad", price : "$7.00", description : "Made with crispy fresh Romaine lettuce & black olives. Served with a Vienna loaf", img: "../../assets/caesar_salad.jpg"},
  {name: "Chicken Caesar Salad", price : "$8.00", description : "Made with tender chicken, black olives, and croutons. Served with a Vienna loaf", img: "../../assets/chicken_caesar_salad.jpg"},
  {name: "Frisco Salad", price : "$9.00", description : "Made with fresh lettuce, chicken, tomatoes, bacon, green olives, croutons, and cheddar cheese. Your choice of dressing", img: null},
  {name: "Buffalo Chicken Salad", price : "$8.00", description : "Made with fresh lettuce, chicken, tomatoes, cheddar cheese, buffalo sauce, and ranch or bleu cheese dressing", img: "../../assets/buffalo_chicken_salad.jpg"},
  {name: "Buffalo Chicken Wrap", price : "$8.00", description : "Just like the salad, but served in a lightly toasted pizza crust wrap", img: "../../assets/buffalo_chicken_wrap.jpg"},
  {name: "Caesar Chicken Wrap", price : "$8.00", description : "Just like the salad, but served in a lightly toasted pizza crust wrap", img: "../../assets/caesar_chicken_wrap.jpg"},
  {name: "Build Your Own Salad/Wrap", price : "$6.00", description : "Lettuce, Cheese (Cheddar or Mozzarella) and Croutons to start, each additional topping $0.50. Choose from pizza toppings.", img: null},
  {name: "Dressings", price : "$0.60", description : "House French, lo cal French, Italian, Creamy Italian, Caesar, Ranch, Bleu Cheese, Thousand Island & Honey Mustard", img: null},
]

const SANDWICHES : FoodItem[] = [
  {name: "Grilled Cheese Basket", price : "$7.00", description : "A delicious grilled cheese sandwich served with a side of french fries.", img: null},
  {name: "Turkey, Bacon, & Ranch", price : "$8.00", description : "Turkey, bacon, Swiss cheese, and Ranch dressing baked in a pizza crust.", img: null},
  {name: "Fish Sandwich Basket", price : "$8.00", description : "Deep-fried fillet of Cod served with tartar sauce & French fries.", img: null},
  {name: "Pepperoni Cheese Melt", price : "$8.00", description : "Pepperoni, mozzarella cheese, mushrooms, green peppers, and sliced tomatoes baked in a pizza crust with a side of sauce.", img: null},
  {name: "Ham & Swiss", price : "$8.00", description : "Ham, Swiss cheese, black olives, and onions baked in a pizza crust.", img: null},
  {name: "Stromboli", price : "$8.00", description : "Ham, salami, Swiss cheese, black olives, and onions baked in a pizza crust. An Italian delight!", img: null},
  {name: "Chicago Torpedo", price : "$8.00", description : "Ham, salami, pepperoni, tomatoes, Swiss cheese, and our own special dressing baked in a pizza crust with a side of sauce.", img: null},
  {name: "Veggie", price : "$8.00", description : "Green peppers, Swiss cheese, mushrooms, onions, olives, sliced tomatoes, and our own special dressing baked in a pizza crust with a side of sauce.", img: null},
  {name: "Calzone", price : "$8.00", description : "Pizza crust filled with sauce, mozzarella cheese, and your choice of 2 pizza ingredients. Add a 3rd topping for just $0.75.", img: null},
  {name: "Sub Sandwich", price : "$7.00", description : "Ham, turkey, or salami with lettuce, cheese, onion, tomato, and mayo. Served hot or cold.", img: null},
]

const BURGERS : FoodItem[] = [
  {name: "Hamburger", price : "$6.50", description : "A juicy 6 oz. hamburger served with a pickle.", img: null},
  {name: "Cheeseburger", price : "$7.50", description : "A hamburger with 2 slices of cheese served with a pickle.", img: null},
  {name: "Mushroom & Swiss Burger", price : "$8.50", description : "A hamburger with mushrooms and Swiss cheese.", img: null},
  {name: "Bacon Cheeseburger", price : "$8.50", description : "A cheeseburger served with 2 slices of bacon and a pickle", img: null},
  {name: "California Burger", price : "$7.50", description : "A hamburger served with lettuce, tomato, mayo, and a pickle.", img: null},
  {name: "Basket", price : "$2.00", description : "Add straight cut, waffle cut, or wedge cut fries to any burger.", img: null},
]

const BUILD_YOUR_OWN_PIZZA : Pizza[] = [
  {name: "Original Thin Crust", sizeAndPrice : [
    {size: 'Small (10")', price: '$10.00', extraToppings: '$1.50'},
    {size: 'Large (14")', price: '$14.00', extraToppings: '$2.50'},
    {size: 'X-Large (17")', price: '$16.00', extraToppings: '$2.75'},
  ], description: null, img: '../../assets/thin_crust_pizza.jpg'},
  {name: "Deep Dish or Stuffed", sizeAndPrice : [
    {size: 'Small (8")', price: '$10.00', extraToppings: '$1.50'},
    {size: 'Large (10")', price: '$13.00', extraToppings: '$2.00'},
    {size: 'X-Large (12")', price: '$16.00', extraToppings: '$2.50'},
  ], description: null, img: '../../assets/deep_dish_pizza.jpeg'}
]

const DEEP_DISH_SPECIALTIES : Pizza[] = [
  {name: "Meat Lovers", sizeAndPrice : [
    {size: 'Small (8")', price: '$14.00', extraToppings: null},
    {size: 'Large (10")', price: '$17.00', extraToppings: null},
    {size: 'X-Large (12")', price: '$22.00', extraToppings: null},
  ], description: 'Sausage, pepperoni, Canadian bacon, salami, mozzarella cheese, and diced tomatoes. Baked in our light, flaky deep dish crust. (Thin crust available on request)', img: null},
  {name: "South Of The Border", sizeAndPrice : [
    {size: 'Small (8")', price: '$12.00', extraToppings: null},
    {size: 'Large (10")', price: '$15.00', extraToppings: null},
    {size: 'X-Large (12")', price: '$19.00', extraToppings: null},
  ], description: 'Sausage or chicken, black olives, onions, a blend of cheese in a spicy sauce, and topped with lettuce & tomatoes. Baked in our light, flaky deep dish crust. (Thin crust available upon request)', img: null},
]

const THIN_CRUST_SPECIALTIES : Pizza[] = [
  {name: "Margherita", sizeAndPrice : [
    {size: 'Small (10")', price: '$10.00', extraToppings: null},
    {size: 'Large (14")', price: '$15.00', extraToppings: null},
    {size: 'X-Large (17")', price: '$17.00', extraToppings: null},
  ], description: 'Olive oil, mozzarella cheese, tomato sauce, dried basil, and Parmesan cheese.', img: null},
  {name: "Original White", sizeAndPrice : [
    {size: 'Small (10")', price: '$10.00', extraToppings: null},
    {size: 'Large (14")', price: '$14.00', extraToppings: null},
    {size: 'X-Large (17")', price: '$17.00', extraToppings: null},
  ], description: 'Garlic butter, fresh garlic, special spices & cheese, served on a buttery crust.', img: null},
]
