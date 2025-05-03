import React from "react";

const tiers = [
    {
        name: "Basic",
        price: "$29/mo",
        subtitle: "Includes up to 50 users, $1/user after",
        features: [
            "Up to 50 users included",
            "$1 per additional user",
            "Email Support",
            "Monthly TeamSpend cost report",
            "Current cost for month dashboard",
        ],
        action: "Get Started",
        value: 1
    },
    {
        name: "Professional",
        price: "$79/mo",
        subtitle: "Includes up to 200 users, $0.75/user after",
        features: [
            "Everything in Basic plan",
            "Up to 200 users included",
            "$0.75 per additional user",
            "Priority Email Support",
            "On-demand TeamSpend cost report",
            "Previous months available on dashboard",
            "Advanced TeamSpend cost analytics dashboard",
        ],
        action: "Coming Soon",
        comingSoon: true,
        value: 2
    },
    {
        name: "Enterprise",
        price: "$140/mo",
        subtitle: "Includes up to 1000 users, $0.50/user after",
        features: [
            "Everything in Professional plan",
            "Up to 1000 users included",
            "$0.50 per additional user",
            "Priority on new feature requests",
            "Historical data analysis and insights",
            "Custom TeamSpend reports tailored to your business needs",
        ],
        action: "Coming Soon",
        comingSoon: true,
        value: 3
    },
];

export default function SubscriptionPage(){
    return (
        <div className="container py-5">
            <h1 className="text-center mb-5" style={{ fontSize: "2.5rem" }}>
                Choose Your Plan
            </h1>
            <div className="row justify-content-center">
                {tiers.map((tier, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div
                            className={`card h-100 rounded-4 shadow-sm ${tier.comingSoon ? "bg-light" : ""}`}
                            style={tier.comingSoon ? { opacity: 0.6 } : {}}
                        >
                            <div className="card-body d-flex flex-column p-4">
                                <h5
                                    className="card-title text-center fw-bold"
                                    style={{
                                        fontSize: "1.8rem",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {tier.name}
                                </h5>
                                <h6 className="text-center fs-4">{tier.price}</h6>
                                <p className="text-muted text-center">
                                    {tier.comingSoon ? "Coming Soon" : tier.subtitle}
                                </p>
                                <hr />
                                <ul className="list-unstyled flex-grow-1 mb-4">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="mb-2">✓ {feature}</li>
                                    ))}
                                </ul>
                                <button
                                    className={`btn w-100 mt-auto ${tier.comingSoon ? "btn-secondary" : "btn-primary"}`}
                                    disabled={tier.comingSoon}
                                    onClick={() => {
                                        localStorage.setItem("planId", tier.value.toString())
                                        window.location.href = `/subscription`}}
                                >
                                    {tier.comingSoon ? "Coming Soon" : tier.action}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};