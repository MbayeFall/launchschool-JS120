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