import { mockData } from "./mock-data";
import axios from "axios";
import NProgress from "nprogress";

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl = 
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
    .then((res) => res.json())
    .catch((error) => error.json());
  
  return result;
};

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
 export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

export const getEvents = async () => {
  NProgress.start();
  console.log("get events has been called");

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();  
    return mockData;
  }

  const token = await getAccessToken();
  console.log(token);

  if (token) {
    removeQuery();
    const url = `https://52c4nxu9zd.execute-api.us-east-1.amazonaws.com/dev/api/get-events/${token}`;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));
  console.log(accessToken);
  console.log(tokenCheck);

  if (!accessToken || tokenCheck.error) {
    console.log("inside getAccessToken if statement");
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
    const code = await searchParams.get("code");
    console.log(code);
    if (!code) {
      console.log("inside second if statement");
      const results = await axios.get(
        "https://52c4nxu9zd.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
      );
      console.log(results);
      const { authUrl } = results.data;
      console.log(authUrl);
      return (window.location.href = authUrl);
    }
    console.log("about to exit inside");
    return code && getToken(code);
  }
  console.log("about to exit outside");
  return accessToken;
}

const getToken = async (code) => {
  try {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(`https://52c4nxu9zd.execute-api.us-east-1.amazonaws.com/dev/api/token/${encodeCode}`);
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`)
  }
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);
  return access_token;
  } catch(error) {
    error.json();
  }
};



