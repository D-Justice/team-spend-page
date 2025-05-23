const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
    protected: false,
  },
  {
    path: ["/login"],
    exact: true,
    component: "Login",
    protected: false,
  },
  {
    path: ["/dashboard"],
    exact: true,
    component: "Dashboard",
    protected: true,
  },
  {
    path: ["/pricing"],
    exact: false,
    component: "Pricing",
    protected: false,
  },
  {
    path: ["/subscription-sign-up"],
    exact: false,
    component: "SubscriptionSignUp",
    protected: false,
  },
];

export default routes;
