const ampInfo = {
  data: {
    application: {
      id: "AMP",
      name: "Agile Metrics Portal",
      default_view: "AMP_L1",
      logo_path_url: "../assets/ampLogo.png",
      body_class: "ampBody",
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
