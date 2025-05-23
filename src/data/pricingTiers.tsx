export interface Tier {
    name: string;
    price: string;
    subtitle: string;
    features: string[];
    action: string;
    value: number;
    option: string;
    comingSoon?: boolean;
}

export const tiers: Tier[] = [
    {
        name: "Free",
        price: "$0/mo",
        subtitle: "Includes unlimited users",
        features: [
            "Receive monthly cost analysis email",
            "Current cost for month dashboard"
        ],
        action: "Get Started",
        value: 0,
        option: "freeOption"
    },
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
        value: 1,
        option: "basicOption"
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
        value: 2,
        option: "professionalOption"
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
        value: 3,
        option: "enterpriseOption"
    },
];