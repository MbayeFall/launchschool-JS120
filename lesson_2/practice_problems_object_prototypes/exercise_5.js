// They will not always have the same output. The for in loop will also iterate over keys that are in the prototypes where as the object keys will only collect the properties that are on the foo object in an array

let qux = {
  apple: 'red'
}

let foo = Object.create(qux);
foo['banana'] = 'yellow';

for (let fruit in foo) {
  console.log(`${fruit}: ${foo[fruit]}`);
}

Object.keys(foo).forEach(fruit => {
  console.log(`${fruit}: ${foo[fruit]}`);
})

// Using the for in loop, A string will be logged to the console twice. One for the banana property and one for the apple property which is on the prototype object
// Using object keys is different as it will only output the string of the banana property to the console and not the property on the prototype.