interface CurrencyModelParams {
  iso: string;
  name: string;
}

const CurrencyModel = ({ iso, name }: CurrencyModelParams) => ({
  iso,
  name,
});

export default CurrencyModel;
