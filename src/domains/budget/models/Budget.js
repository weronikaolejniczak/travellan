class Budget {
  constructor(id, value, currency, history, defaultAccount) {
    this.id = id;
    this.value = value;
    this.currency = currency;
    this.history = history;
    this.defaultAccount = defaultAccount;
  }
}

export default Budget;
