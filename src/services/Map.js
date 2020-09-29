import openMap, { createOpenLink, createMapLink } from "react-native-open-maps";

export const openGoogleMap = (latitude, longitude) => {
  if (latitude && longitude) {
    try {
      openMap({
        query: `${latitude},${longitude}`,
        provider: "google",
        zoom: 16
      });
    } catch (err) {
      console.log(err);
    }
  }
};
