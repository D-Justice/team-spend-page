import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { Tier } from "../../data/pricingTiers";
import { RetrieveTierSettings } from "../../requests/auth";



export default function Pricing() {
    const { instance, accounts, inProgress } = useMsal();
    const [tiers, setTiers] = useState<Tier[]>([])

    useEffect(() => {
        const retrieveTierSettings = async () => {
            var response = await RetrieveTierSettings()
            
            setTiers(response)
        }
        retrieveTierSettings()
    }, [])
    return (
        <>
            {tiers.length > 0 && <div className="container py-5">
                <h1 className="text-center mb-5" style={{ fontSize: "2.5rem" }}>
                    Choose Your Plan
                </h1>
                <div className="row justify-content-center">
                    {tiers.map((tier, index) => (
                        <div key={index} className="col-md-3 mb-3">
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
                                            localStorage.setItem("tierValue", tier.value.toString())
                                            window.location.href = accounts.length > 0 ? "/dashboard" : "/login"
                                        }
                                        }
                                    >
                                        {tier.comingSoon ? "Coming Soon" : tier.action}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    );
};