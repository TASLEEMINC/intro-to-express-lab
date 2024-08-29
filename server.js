const express = require("express");

const app = express();

// Task: Create a route /shoes that filters the list of shoes based on query parameters.
// Query Parameters:
// min-price: Excludes shoes below this price.
// max-price: Excludes shoes above this price.
// type: Shows only shoes of the specified type.
// No parameters: Responds with the full list of shoes.

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  let filteredShoes = shoes;

  const min_price = req.query.min_price;
  const max_price = req.query.max_price;
  const type = req.query.type;

  if (min_price) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.price >= Number(min_price)
    );
  }

  if (max_price) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.price <= Number(max_price)
    );
  }

  if (type) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.type === type);
  }

  res.json(filteredShoes);
});

// Task: Create a route for URLs like /collectibles/<index-parameter>.
// Examples: Matches routes such as /collectibles/2 or /collectibles/0.
// Validation: If the index does not correspond to an item in the array, respond with “This item is not yet in stock. Check back soon!”
// Response: Should describe the item at the given index, like “So, you want the shiny ball? For 5.95, it can be yours!” Include both the name and price properties.

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const index = Number(req.params.index);
  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send(
      `<h1 style = 'color:green'><i>'This item is not yet in stock. Check back soon!'</i></h1>`
    );
  }
  const item = collectibles[index];
  res.send(
    `<h1 style = 'color:orange'><i>So, you want the ${item.name}? For ${item.price}, it can be yours!</i></h1>`
  );
});

// Task: Create a route that responds to URLs like /greetings/<username-parameter>.

app.get("/greetings/:firstName", (req, res) => {
  res.send(
    `
    <h1>
        What a delight it is to see you once more, ${req.params.firstName}
    </h1>
    `
  );
  console.log("hi5");
});

// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.
// Examples: Matches routes like /roll/6 or /roll/20.
// Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.
// Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.”

app.get("/roll/:numberParam", (req, res) => {
  if (isNaN(Number(req.params.numberParam))) {
    res.send(`<h1 style = 'color:red'>You must specify a number.</h1>`);
  } else {
    res.send(
      `<h1> You rolled a ${Math.floor(
        Math.random() * (Number(req.params.numberParam) + 1)
      )} </h1>`
    );
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Hello Express!</h1>");
});

app.listen(3000, () => console.log("The server is running"));
