import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { trainingData } from "../Redux/dataSlice.js";
// import { base_url } from './../Data/CommonUrl';

// Define a service using a base URL and expected endpoints
export const dataService = createApi({
  reducerPath: "dataService",
  baseQuery: fetchBaseQuery({ baseUrl: "https://strapidemomy.herokuapp.com" }),
  endpoints: (builder) => ({
    getHomeData: builder.query({
      query: function () {
        return {
          url: "api/home-page",
          method: "GET"
        };
      }
    }),

    getContactUsData: builder.query({
      query: function () {
        return {
          url: "api/contact-us",
          method: "GET"
        };
      }
    }),
    getTrainingData: builder.query({
      query: function () {
        return {
          url: "api/training-page",
          method: "GET"
        };
      }, async onQueryStarted(id,{ dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(trainingData(data.data.attributes.trainingCard))
        } catch (err) {
          console.log(err);
        }
      },
    }),
    postTrainingForm: builder.mutation({
      query: function (data) {
        return {
          url: "api/apply-for-courses",
          method: "POST",
          body: data
        };
      }
    }),
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetHomeDataQuery,
  useGetNavFootQuery,
  useGetServicePageDataQuery,
  useGetIndustryPageDataQuery,
  useGetAboutUsPageDataQuery,
  useGetContactUsDataQuery,
  useGetTrainingDataQuery,
  usePostTrainingFormMutation,
  usePostContactUsFormMutation
} = dataService;
