const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];
  app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
  
    // res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
    const type = req.query.type;
    console.log(type)
  
    if (type) {
      filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }
  });