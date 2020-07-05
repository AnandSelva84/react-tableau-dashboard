const ampInfo = {
  data: {
    application: {
      id: "AMP",
      name: "Agile Metrics Portal",
      default_view: "AMP_L1",
      logo_path_url: "../../assests/images/ampLogo.png",
      app_body_css_class: "ampBody",
    },
    subject_area: {
      id: "PORT",
      name: "Application Development",
      css_class: "panelPortfolio",
      default_view_id: "AMP_L1",
    },
    default_view: {
      id: "AMP_L1",
      depth_level: "Level 1",
      display_name: "Agile Metrics Portal Menu",
      type: "Application",
    },
    focus_area: [
      {
        panel_id: "PORT_DETAIL_VIZ1",
        panel_header_title: "Effectivness (KPIs)",
        title_action_type: "Level 2",
        title_action_url:
          "http://public.tableau.com/views/RegionalSampleWorkbook/College",
        focus_area_order: 1,
        view_thumbnail_path: "",
        view_display_name: "Effectivness (KPIs)",
        route: "effectivness",
        items: [
          {
            title: "Story Delivery Lead Time",
            route: "storyDeliveryTime",
            level: 3,
          },
          {
            title: "Feature Delivery Lead Time",
            route: "featureDeliveryLeadTime",
            level: 3,
          },
          {
            title: "Sprint Predictability/Volatility",
            route: "sprintPredict",
            level: 3,
          },
          ,
          {
            title: "PI Predictability/Volatility",
            route: "piPredict",
            level: 3,
          },
          {
            title: "High & Medium Defect Backlog",
            route: "defectBacklog",
            level: 3,
          },
          {
            title: "New High Defects",
            route: "newDefects",
            level: 3,
          },
        ],
      },
    ],
  },
};

const kidInfo = {
  data: {
    application: {
      id: "KID",
      name: "Key Indicators Dashboard",
      default_view: "KID",
      logo_path_url: "../assets/USAA-logoMain-JDLC.svg",
      body_class: null,
    },
    subject_area: [
      {
        id: "MPPL",
        name: "MPPLFinancials",
        css_class: " panelFinancials",
        default_view_id: "MPPL_L1",
      },
      {
        id: "SUI",
        name: "Service Incidents",
        css_class: "panleServiceTickets",
        default_view_id: "SUI_L1",
      },
    ],
    default_view: {
      id: "KID_L1",
      depth_level: "Level 0",
      display_name: "Key Indicators Dashboard",
      type: "Application",
    },
  },
};

module.exports = { ampInfo, kidInfo };
