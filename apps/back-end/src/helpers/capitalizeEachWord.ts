const capitalizeEachWord = (name: string) =>
  name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');

export default capitalizeEachWord;
