// NaN
// 5

// The function call on line 12 has an execution context of the global object. Since a and b are not defined in the global object. The output is undefined + unefined which is NaN
// The line 10 create a new function and binds its execution context the obj declared on line 1 and assign the value to the variable bar. When we call the function bar on line 13, the this keyword point to the obj Object