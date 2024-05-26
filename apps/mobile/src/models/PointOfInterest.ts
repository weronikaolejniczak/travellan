interface PointOfInterestModelParams {
  id: string;
  key: string;
  latitude: number;
  longitude: number;
  title: string;
}

const PointOfInterestModel = ({
  id,
  key,
  latitude,
  longitude,
  title,
}: PointOfInterestModelParams) => ({
  id,
  key,
  latitude,
  longitude,
  title,
});

export default PointOfInterestModel;
