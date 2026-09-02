import { apiCreateOrder, apiVerifyPayment } from "./api";

const RZP_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpay() {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = RZP_SRC;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

/**
 * Full purchase flow: create order → open Razorpay checkout → verify.
 * @returns {Promise<object>} verify result (credits / subscription / user)
 * Throws on failure or if the user dismisses the checkout.
 */
export async function startPayment({ kind, itemId, token, user }) {
  const order = await apiCreateOrder(token, { kind, itemId });

  const ok = await loadRazorpay();
  if (!ok) throw new Error("Payment SDK load nahi hua. Internet check karein.");

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: "AstroVeda",
      description: order.name,
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: user?.profile?.phone || "",
      },
      theme: { color: "#e11d48" },
      handler: async (resp) => {
        try {
          const result = await apiVerifyPayment(token, {
            razorpay_order_id: resp.razorpay_order_id,
            razorpay_payment_id: resp.razorpay_payment_id,
            razorpay_signature: resp.razorpay_signature,
            kind,
            itemId,
          });
          resolve(result);
        } catch (e) {
          reject(e);
        }
      },
      modal: {
        ondismiss: () => reject(new Error("Payment cancel ho gaya.")),
      },
    });
    rzp.on("payment.failed", (r) => reject(new Error(r?.error?.description || "Payment fail hua.")));
    rzp.open();
  });
}
