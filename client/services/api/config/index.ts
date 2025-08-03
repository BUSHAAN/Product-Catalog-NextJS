import { api_URL } from "@/services/sevices.constants";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = (endpoint: string) =>
  fetchBaseQuery({
    baseUrl: `${api_URL}${endpoint}/`,

    responseHandler: (response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    },
  });


export default baseQuery;