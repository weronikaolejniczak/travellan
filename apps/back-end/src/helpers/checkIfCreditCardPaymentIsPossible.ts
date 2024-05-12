const checkIfCreditCardPaymentIsPossible = (data) =>
  data?.policies?.guarantee?.acceptedPayments?.methods?.includes('CREDIT_CARD');

export default checkIfCreditCardPaymentIsPossible;
