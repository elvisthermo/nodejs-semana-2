import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';

}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;

  }


  public getBalance():Balance {

    let outcome = this.getOutcome();
    let income = this.getIncome();

    const total = income - outcome;

    const balance:Balance = {
      income,
      outcome,
      total
    }

    return balance;
  }

  private getIncome():number{
    let income =[];

    for (const item of this.transactions) {
      if(item.type==='income'){
        income.push(item.value);
      }
    }
    if(income.length){
      const result = income.reduce( (accum,curr) => accum + curr );
      return result;
    }
    return 0;
  }

  private getOutcome():number{
    let outcome =[];

    for (const item of this.transactions) {
      if(item.type==='outcome'){
        outcome.push(item.value);
      }
    }
    if(outcome.length){
      const result = outcome.reduce( (accum,curr) => accum + curr );
      return result;
    }
    return 0;
  }

  public create({title,value,type}:CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title,value,type});

    this.transactions.push(transaction);


    return transaction;
  }
}

export default TransactionsRepository;
