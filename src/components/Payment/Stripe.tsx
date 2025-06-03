import React, { useState } from "react";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CreateSubscription } from "../../requests/stripe";
import { Button } from "antd";
import { GetUserCount } from "../../requests/customer";

const stripePromise = loadStripe("pk_test_51RS99I2Us93KiirWj8LlqtPgglR9cQBCUF2O89XBoVkCPM1TWn2YGMdmgbjN0rdQLXwwzVFWAxCPslQTvSsxwoVM00QNvpXyf4");

interface Props {
    selectedTier: number;
    displaySelectedTier: () => JSX.Element;
    displayTierSelector: () => JSX.Element;
}

function SubscriptionForm({ selectedTier, displaySelectedTier, displayTierSelector }: Props) {
    const stripe = useStripe();
    const elements = useElements();
    const [status, setStatus] = useState("");
    const [userCount, setUserCount] = useState<number>(0);

    const handleClick = async () => {
        const count = await GetUserCount();
        setUserCount(count);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Processing...");

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement
        });

        if (error) {
            setStatus(error.message || "Failed to create payment method.");
            return;
        }

        try {
            const response = await CreateSubscription(
                selectedTier,
                paymentMethod.id,
                userCount
            );
            console.log(response.status)
            if (response.status == "active") {
                setStatus(`✅ Subscription created!`);
            } else {
                setStatus(response.message || "❌ Subscription failed");
            }
        } catch {
            setStatus("❌ Server error");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "2rem",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                maxWidth: "400px",
                margin: "0 auto",
                backgroundColor: "#fff"
            }}
        >
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Subscribe</h3>
            {displayTierSelector()}
            {<>{displaySelectedTier()}</>}

            <div style={{ width: "49%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Button onClick={handleClick}>Get user count of organization</Button>
                {userCount > 0 && <p>There are {userCount} users in your Microsoft 365 organization</p>}
            </div>
            <div
                style={{
                    padding: "0.75rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9"
                }}
            >
                <CardElement />
            </div>

            <button
                type="submit"
                disabled={!stripe || userCount <= 0}
                style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem"
                }}
            >
                Subscribe
            </button>

            <p style={{ textAlign: "center", color: "#666" }}>{status}</p>
        </form>
    );
}

export default function StripeWrapper({ selectedTier, displaySelectedTier, displayTierSelector }: Props) {
    return (
        <Elements stripe={stripePromise}>
            <SubscriptionForm selectedTier={selectedTier} displaySelectedTier={displaySelectedTier} displayTierSelector={displayTierSelector} />
        </Elements>
    );
}
