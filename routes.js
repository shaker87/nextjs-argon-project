const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    layout: "/admin",
  },
  {
    path: "/test",
    name: "Next-Auth Sess Info",
    icon: "ni ni-shop text-primary",
    layout: "",
  },
  {
    collapse: true,
    name: "Surveys",
    icon: "ni ni-ungroup text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/surveys",
        name: "Surveys",
        miniName: "S",
        layout: "/surveys",
      },
      {
        path: "/surveyResults",
        name: "My Surveys",
        miniName: "R",
        layout: "/surveys",
      },
      {
        path: "/surveyCreate",
        name: "Create a Survey",
        miniName: "C",
        layout: "/surveys",
      },
      {
        path: "/createdSurveys",
        name: "My Created Surveys",
        miniName: "M",
        layout: "/surveys",
      },
    ],
  },
];

export default routes;
