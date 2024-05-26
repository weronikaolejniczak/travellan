import MapModel from './Map';

interface Region {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}

interface TripModelParams {
  accommodation: string[];
  budget: number;
  cityCode?: string;
  destination: string;
  endDate: Date;
  id: string;
  image: string;
  map: MapModel;
  notes: string[];
  region: Region;
  startDate: Date;
  transport: string[];
}

const TripModel = ({
  accommodation,
  budget,
  cityCode,
  destination,
  endDate,
  id,
  image,
  map,
  notes,
  region,
  startDate,
  transport,
}: TripModelParams) => ({
  accommodation,
  budget,
  cityCode,
  destination,
  endDate,
  id,
  image,
  map,
  notes,
  region,
  startDate,
  transport,
});

export default TripModel;
