import userApiClient from "../userApiClient";


export async function CreateSubscription(tierLevel: number, paymentMethodId: string, employeeCount: number) {
  return await userApiClient.post(`api/subscriptions`, {
    tierLevel,
    paymentMethodId,
    employeeCount
  }).then(resp => resp.data);
}
