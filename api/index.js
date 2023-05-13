import axios from "axios";

export const getPlaceData = async (leti, long, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`,
      {
        params: {
          latitude: leti,
          longitude: long,
          limit: "20",
          currency: "USD",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "API Key", //ca
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const getLongData = async (city) => {
  const options = {
    method: "GET",
    url: "https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding",
    params: { city: city },
    headers: {
      "X-RapidAPI-Key": "API Key", //ca
      "X-RapidAPI-Host": "geocoding-by-api-ninjas.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return [response.data[0]?.latitude, response.data[0]?.longitude];
    // console.log(response.data[0]?.latitude);
    // console.log(response.data[0]?.longitude);
  } catch (error) {
    console.error(error);
  }
};
