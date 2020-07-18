import axios from 'axios';
import {UNSPLASH_ID} from 'react-native-dotenv';

const client_id = UNSPLASH_ID;
const placeholderUrl =
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1866&q=80';

/** fetch image from api.unsplash.com */
export async function fetchImage(keyword) {
  return await axios
    .get(
      `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${client_id}`,
    )
    .then((json) => {
      let imageUrl = json.data.results[0].urls.regular.toString();
      let authorName = json.data.results[0].user.name.toString();
      let username = json.data.results[0].user.username.toString();

      let image = {imageUrl, authorName, username};

      return image;
    })
    .catch(() => {
      let imageUrl = placeholderUrl;
      let authorName = 'Annie Spratt';
      let username = 'anniespratt';

      let image = {imageUrl, authorName, username};

      return image;
    });
}
