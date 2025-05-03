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
    path: ["/subscription"],
    exact: false,
    component: "SubscriptionDetails",
    protected: true,
  },
];

export default routes;
