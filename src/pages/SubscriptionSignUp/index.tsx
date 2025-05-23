import { useEffect, useState } from "react";
import { Tier, tiers } from "../../data/pricingTiers";
import { Button, Col, Dropdown, MenuProps, Row, Space } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { GetUserCount } from "../../requests/customer";

export default function SubscriptionSignUp() {
    const [option, setOption] = useState<string>("basicOption")
    const [userCount, setUserCount] = useState<number>()
    const [selectedTier, setSelectedTier] = useState<Tier>()
    useEffect(() => {
        if (option) {
            setSelectedTier(tiers.find(x => x.option === option))
        }
    }, [option])

    const items: MenuProps['items'] = [
        {
            label: 'Free',
            key: 'freeOption',
            onClick: () => setOption('freeOption')
        },
        {
            label: 'Basic',
            key: 'basicOption',
            onClick: () => setOption('basicOption')
        },
        {
            label: 'Professional',
            key: 'professionalOption',
            onClick: () => setOption('professionalOption')
        },
        {
            label: 'Enterprise',
            key: 'enterpriseOption',
            onClick: () => setOption('enterpriseOption')
        },
    ];
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
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a
                        onClick={e => e.preventDefault()}
                        style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #d9d9d9',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                            userSelect: 'none',
                            marginBottom: '2rem',
                        }}
                    >
                        <Space>
                            {selectedTier?.name || 'Select Plan'}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <div style={{ width: "100vw", display: "flex", justifyContent: "space-between", gap: "2%" }}>
                    <div style={{ width: "49%", display: "flex", justifyContent: "center" }}>
                        {selectedTier && (
                            <div className="card h-100 rounded-4 shadow-sm" style={{ maxWidth: '400px', opacity: selectedTier.comingSoon ? 0.6 : 1 }}>
                                <div className={`card-body d-flex flex-column p-4 ${selectedTier.comingSoon ? "bg-light" : ""}`}>
                                    <h5 className="card-title text-center fw-bold" style={{ fontSize: "1.8rem", whiteSpace: "nowrap" }}>
                                        {selectedTier.name}
                                    </h5>
                                    <h6 className="text-center fs-4">{selectedTier.price}</h6>
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

                    <div style={{ width: "49%", display: "flex", justifyContent: "center" }}>
                        <Button onClick={async () => setUserCount(await GetUserCount())}>Test</Button>
                        {userCount && <p>There are {userCount} users in your Microsoft 365 organization</p>}
                    </div>
                </div>

            </div>
        </div>
    );
}