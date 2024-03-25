import { setDefaults, geocode, RequestType } from "react-geocode";

setDefaults({
  key: "", // Your API key here.
  language: "en", // Default language for responses.
  region: "in", // Default region for responses.
});

const LocationService = {
  getAddress: async (location) => {
    console.log(location.latitude + "," + location.longtitude);
    return await geocode(
      RequestType.LATLNG,
      location.latitude + "," + location.longtitude
    )
      .then(({ results }) => {
        const address = results[0];
        console.log(address);
        return address;
      })
      .catch((error) => {
        return { error: "unable to get address" };
      });
  },
};

export default LocationService;
