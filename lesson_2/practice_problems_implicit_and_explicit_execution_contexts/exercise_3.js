// On line 1, the string 'Hello from the global scope' is defined on the global object. The function declared on line 3 is then called on line 7. Since the execution context at that point is the global object, it will output 'Hello from the global scope. The method call on the last line uses the object foo to call it therefore, the object foo is its execution context.

// The final output will be:
/*
'Hello from the global scope'
'Hello from the function scope'
*/

message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();

let foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage();