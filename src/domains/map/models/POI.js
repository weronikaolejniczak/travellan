class POI {
  constructor(title, latitude, longitude) {
    this.id = new Date.now().toString();
    this.title = title;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export default POI;
