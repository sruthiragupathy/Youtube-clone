import axios from "axios";

class RESTError extends Error {
  constructor(message) {
    super(message);
    this.name = "RESTError";
  }
}

export const RestApiCalls =  async (method, route, data) => {
  switch (method) {
    case "GET": {
      try {
        let res = await axios.get(route);
        
        if (res.status === 200) {
    
          return {
            data: res.data.videos,
            error: false
          };
        } else {
          throw new RESTError("OOPS!Could not fetch data from Server");
        }
      } catch (error) {
        return { response: error, error: true };
      }
    }
    default:
      return "The provided method is not valid";
  }
};
