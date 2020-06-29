import axios from 'axios';

const client_id = 'RXmUf-jvLVJYucXpykedgOoAmqd2ncLSxY960exes_o';
const placeholderUrl =
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1866&q=80';

/** fetch image from api.unsplash.com */
export async function fetchImage(keyword) {
  return await axios
    .get(
      `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${client_id}`,
    )
    .then((json) => json.data.results[0].urls.regular)
    .catch(() => placeholderUrl);
}
