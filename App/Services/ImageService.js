import axios from 'axios';

const client_id = 'RXmUf-jvLVJYucXpykedgOoAmqd2ncLSxY960exes_o';

/**
 * fetch image from api.unsplash.com
 */
export async function fetchImage(keyword) {
  return await axios
    .get(
      `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${client_id}`,
    )
    .then((json) => json.data.results[0].urls.regular);
}
