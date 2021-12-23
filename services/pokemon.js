const superagent = require('superagent')

const Pokemon = async (req, res, next) => {
  
  // Your code here
  let ids = req.body.ids;
  let response_data = []; // this array variable is used to store response data
  let counter = 0; // counter variable is to append data into existing array and add all the data

  for (var id in ids) {
    response_data[counter] = {}; // created empty array for each counter
    try {
      const response = await superagent.get('https://pokeapi.co/api/v2/pokemon/' + ids[id]+'/');
      response_data[counter]['name'] = response.body.name;
      response_data[counter]['types'] = []; // created empty array for types

      // below code is to iterate pokeman types and append type name into types array
      for (var type in response.body.types) {
        response_data[counter]['types'][type] = response.body.types[type].type.name;
      }
      // below code is to add sprite into response data array
      response_data[counter]['sprite'] = response.body.sprites.front_default;
    } catch(error) {
      //retrun response_data with error `notfound` when pokemon/id does not exists 
      response_data[counter]['name'] = "notfound";
    }
    counter++;
  }

  res.status(200).send(response_data)
  next()
}

module.exports = Pokemon