import { useEffect, useState } from "react";
import { Tier } from "../../data/pricingTiers";
import { Button } from "antd";
import { GetUserCount } from "../../requests/customer";
import StripeWrapper from "../../components/Payment/Stripe";
import { RetrieveTierSettings } from "../../requests/auth";

export default function SubscriptionSignUp() {
    const [option, setOption] = useState<string>("basicOption");
    const [userCount, setUserCount] = useState<number>(0);
    const [selectedTier, setSelectedTier] = useState<Tier | undefined>();
    const [tiers, setTiers] = useState<Tier[]>([]);

    useEffect(() => {
        const retrieveTierSettings = async () => {
            const fetchedTiers = await RetrieveTierSettings();
            setTiers(fetchedTiers);
        };

        retrieveTierSettings();
    }, []);

    useEffect(() => {
        if (option && tiers.length > 0) {
            const tier = tiers.find(x => x.option === option);
            setSelectedTier(tier);

        }
    }, [option, tiers]);

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOption(e.target.value);
    };

    const handleClick = async () => {
        const count = await GetUserCount();
        setUserCount(count);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
            }}
        >
            <div style={{ textAlign: 'center', width: '100%' }}>
                <small className="d-block mb-2 text-white">Select subscription tier</small>

                <select id="tier-select" value={option} onChange={handleDropdownChange}>
                    {tiers.map((tier) => (
                        <option key={tier.option} value={tier.option}>
                            {tier.name}
                        </option>
                    ))}
                </select>

                <div style={{ width: "100vw", display: "flex", justifyContent: "space-between", gap: "2%" }}>
                    <div style={{ width: "49%", display: "flex", justifyContent: "center" }}>
                        {selectedTier && (
                            <div className="card h-100 rounded-4 shadow-sm" style={{ maxWidth: '400px', opacity: selectedTier.comingSoon ? 0.6 : 1 }}>
                                <div className={`card-body d-flex flex-column p-4 ${selectedTier.comingSoon ? "bg-light" : ""}`}>
                                    <h5 className="card-title text-center fw-bold" style={{ fontSize: "1.8rem", whiteSpace: "nowrap" }}>
                                        {selectedTier.name}
                                    </h5>
                                    <h6 className="text-center fs-4">{selectedTier.priceLabel}</h6>
                                    <p className="text-muted text-center">
                                        {selectedTier.comingSoon ? "Coming Soon" : selectedTier.subtitle}
                                    </p>
                                    <hr />
                                    <ul className="list-unstyled flex-grow-1 mb-4 text-start">
                                        {selectedTier.features.map((feature, i) => (
                                            <li key={i} className="mb-2">✓ {feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    <StripeWrapper employeeCount={userCount} selectedTier={selectedTier?.value!} />

                    <div style={{ width: "49%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Button onClick={handleClick}>Get user count of organization</Button>
                        {userCount > 0 && <p>There are {userCount} users in your Microsoft 365 organization</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
