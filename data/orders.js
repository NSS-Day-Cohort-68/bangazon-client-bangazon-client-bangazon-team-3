import { fetchWithResponse } from "./fetcher"

export function getCart() {
<<<<<<< HEAD
  return fetchWithResponse('cart', {
=======
  return fetchWithResponse("cart", {
>>>>>>> develop
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export function getOrders() {
  return fetchWithResponse("orders", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export function completeCurrentOrder(orderId, paymentTypeId) {
  return fetchWithResponse(`orders/${orderId}/complete`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentTypeId }),
  })
}
