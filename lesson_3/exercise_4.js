// let invoice = {
//   phone: 3000,
//   internet: 6500
// };

// let payment = {
//   phone: 1300,
//   internet: 5500
// };

// let invoiceTotal = invoice.phone + invoice.internet;
// let paymentTotal = payment.phone + payment.internet;
// let remainingDue = invoiceTotal - paymentTotal;

// console.log(paymentTotal);         // => 6800
// console.log(remainingDue);         // => 2700

// To process multiple invoices, we need a factory method that we can use to create invoices. The requirements for the factory function are as follows:

// It returns an invoice object, with phone and internet properties, and a total method.
// The default value for the phone service is 3000, and the internet service is 5500 (in cents, of course!).
// The function takes an object argument whose attributes override the default values.
// Your function should work with the following code:

function createInvoice(services) {
  if (typeof services !== 'object') services = {};
  let phoneBill = services.phone || 3000;
  let internetBill = services.internet || 5500;

  return {
    phoneBill: phoneBill,
    internetBill: internetBill,

    total: function () {
      return this.phoneBill + this.internetBill;
    }
  }
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000

// Now we can build a factory function to create payments. The function can take an object argument in one of 3 forms:

// Payment for one service, e.g., { internet: 1000 } or { phone: 1000 }.
// Payment for both services, e.g., { internet: 2000, phone: 1000 }.
// Payment with just an amount property, e.g., { amount: 2000 }.
// The function should return an object that has the amount paid for each service and a total method that returns the payment total. If the amount property is not present in the argument, it should return the sum of the phone and internet service charges; if the amount property is present, return the value of that property.

// Your function should work with the following code:
// The function should return an object that has the amount paid for each service and a total method that returns the payment total. If the amount property is not present in the argument, it should return the sum of the phone and internet service charges; if the amount property is present, return the value of that property.

function createPayment(services) {
  if (typeof services !== 'object') services = {};
  let amount = services.amount;
  let phoneBill = services.phone || 0;
  let internetBill = services.internet || 0;

  return {
    amount: amount,
    phoneBill: phoneBill,
    internetBill: internetBill,

    total: function () {
      if (!amount) {
        return this.phoneBill + this.internetBill;
      } else return this.amount;
    }
  }
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000