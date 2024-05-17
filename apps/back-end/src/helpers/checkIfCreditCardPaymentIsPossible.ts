interface ICreditCardPaymentData {
  policies: {
    guarantee: {
      acceptedPayments: {
        methods: string[];
      };
    };
  };
}

const checkIfCreditCardPaymentIsPossible = (data: ICreditCardPaymentData) =>
  data?.policies?.guarantee?.acceptedPayments?.methods?.includes('CREDIT_CARD');

export default checkIfCreditCardPaymentIsPossible;
