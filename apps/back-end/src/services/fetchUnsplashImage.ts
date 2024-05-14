import fetch from 'node-fetch';

interface UnsplashUser {
  name: string;
  username: string;
}

interface UnsplashUrl {
  regular: string;
}

interface UnsplashResult {
  urls: UnsplashUrl;
  user: UnsplashUser;
}

interface UnsplashResponse {
  results: UnsplashResult[];
}

interface UnsplashImage {
  authorName: string;
  imageUrl: string;
  username: string;
}

const defaultImage: UnsplashImage = {
  authorName: 'Annie Spratt',
  imageUrl:
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1866&q=80',
  username: 'anniespratt',
};

const fetchUnsplashImage = async (keyword: string): Promise<UnsplashImage> => {
  const uri = encodeURI(
    `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${process.env.UNSPLASH_API_KEY}`,
  );

  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = (await response.json()) as UnsplashResponse;

    if (data.results.length > 0 && data.results[0]) {
      const imageUrl = data.results[0].urls.regular;
      const authorName = data.results[0].user.name;
      const username = data.results[0].user.username;

      return { authorName, imageUrl, username };
    } else {
      console.warn('No results found for the keyword');
      return defaultImage;
    }
  } catch (error) {
    console.error('Fetch failed: ', error);
    return defaultImage;
  }
};

export default fetchUnsplashImage;
