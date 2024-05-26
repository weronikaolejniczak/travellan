export interface Region {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}

export interface MapNode {
  id: string;
  latitude: number;
  longitude: number;
}

export interface MapModelParams {
  nodes: MapNode[];
  region: string | null;
}

const MapModel = ({ nodes, region }: MapModelParams) => ({
  nodes,
  region,
});

export default MapModel;
