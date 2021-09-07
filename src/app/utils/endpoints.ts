export const BASE_URI = "https://www.googleapis.com/fitness/v1/users";

export const Endpoints = {
  getDataSources: "/me/dataSources/",
  getAggregatedData: "/me/dataset:aggregate/"
}

export const ReadScopes = [
  "https://www.googleapis.com/auth/fitness.body.read",
  "https://www.googleapis.com/auth/fitness.activity.read"
]

export const WriteScopes = [

]
