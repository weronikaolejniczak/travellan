interface TomTomSearchResponse {
  results: {
    position: {
      lat: number;
      lon: number;
    };
  }[];
}

const fetchCoordinates = async (
  keyword: string,
): Promise<{ lat: number; lon: number } | null> => {
  const url = encodeURI(
    `https://api.tomtom.com/search/2/geocode/${keyword}.json?key=${process.env.TOM_TOM_API_KEY}`,
  );

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: TomTomSearchResponse = await response.json();

    if (data.results.length > 0 && data.results[0]?.position) {
      return data.results[0].position;
    } else {
      console.warn('No results found');
      return null;
    }
  } catch (error) {
    console.error('Fetch failed: ', error);
    throw error;
  }
};

export default fetchCoordinates;
