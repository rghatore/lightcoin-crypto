class Account {

  constructor(username) {
    this.username = username;
    // this.balance = 0; // account balance starting at zero dollars
    this.transactions = [];
  }

  get balance() {
    let sum = 0;
    for (const transaction of this.transactions) {
      sum += transaction;
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
/*
  get value() {
    // if deposit return positive amount, else if withdrawal return negative amount
    if (this instanceof Deposit) {
      return this.amount;
    } else if (this instanceof Withdrawal) {
      return 0 - this.amount;
    }
  }
*/
  commit() {
    // this.account.balance += this.value;
    // console.log(this.isAllowed);
    if (!this.isAllowed) {
      return "Transaction failed! Not enough balance!";
    }
    this.time = new Date();
    this.account.addTransaction(this.value);
  }



}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  get isAllowed() {
    this.status = 'Transaction successful';
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return 0 - this.amount;
  }

  get isAllowed() {
    // the following is refactored below if not adding status
    if (this.amount > this.account.balance) {
      this.status = 'Transaction failed!';
      return false
    } else {
      this.status = 'Transaction successful.';
      return true;
    }
    // return (this.amount <= this.account.balance); // if not adding status
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log('Balance:', myAccount.balance);


t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);
console.log('Balance:', myAccount.balance);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);
console.log('Balance:', myAccount.balance);
