import axios from 'axios';
import {UNSPLASH_API} from 'react-native-dotenv';

const API_KEY = UNSPLASH_API;

const defaultImage = {
  imageUrl:
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1866&q=80',
  authorName: 'Annie Spratt',
  username: 'anniespratt',
};

async function fetchImage(keyword) {
  return await axios
    .get(
      `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${API_KEY}`,
    )
    .then((json) => {
      const imageUrl = json.data.results[0].urls.regular.toString();
      const authorName = json.data.results[0].user.name.toString();
      const username = json.data.results[0].user.username.toString();

      const image = {imageUrl, authorName, username};

      return image;
    })
    .catch((error) => {
      return defaultImage;
    });
}

export default fetchImage;
