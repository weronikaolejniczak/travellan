import MapModel from './Map';

interface Region {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}

interface TripParams {
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

const Trip = ({
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
}: TripParams) => ({
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

export default Trip;
