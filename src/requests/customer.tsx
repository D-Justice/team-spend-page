import apiClient from "../apiClient";

export async function CheckUserSubscription() {
    return await apiClient.get(`/customer/user-subscription`)
    .then(resp => {
        return resp.data})
  }

  export async function GetUserCount() {
    return await apiClient.get(`/customer/user-count`)
    .then(resp => {
        console.log(resp.data)
        return resp.data})
  }