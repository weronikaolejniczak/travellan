interface CurrencyParams {
  iso: string;
  name: string;
}

const Currency = ({ iso, name }: CurrencyParams) => ({
  iso,
  name,
});

export default Currency;
