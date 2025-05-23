import apiClient from "../apiClient";

export async function RequestOAuthLink() {
  await apiClient.get(`/oauth`)
    .then(resp => {
      window.location.href = resp.data;
    });
};
