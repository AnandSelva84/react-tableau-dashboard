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
    all_views : [
      {
        id: "AMP_L1",
        route: "",
        depth_level: "Level 1"
      },
      {
        id: "PORT_1_L2",
        route: "effectiveness",
        depth_level: "Level 2"
      },
      {
        id: "PORT_2_L2",
        route: "teamDiagnostics",
        depth_level: "Level 2"
      },
      {
        id: "PORT_11_L3",
        route: "storyDeliveryLeadTime",
        depth_level: "Level 3"
      },
      {
        id: "PORT_12_L3",
        route: "sprintPredictabilityVolatility",
        depth_level: "Level 3"
      }
    ]
    // focus_area: [
    //   {
    //     panel_id: "PORT_DETAIL_VIZ1",
    //     panel_header_title: "Effectivness (KPIs)",
    //     title_action_type: "Level 2",
    //     title_action_url:
    //       "http://public.tableau.com/views/RegionalSampleWorkbook/College",
    //     focus_area_order: 1,
    //     view_thumbnail_path: "",
    //     view_display_name: "Effectivness (KPIs)",
    //     route: "effectivness",
    //     items: [
    //       {
    //         title: "Story Delivery Lead Time",
    //         route: "storyDeliveryTime",
    //         level: 3,
    //         level2_action_url:
    //           "http://public.tableau.com/views/RegionalSampleWorkbook/College",
    //         level3_action_url:
    //           "http://public.tableau.com/views/RegionalSampleWorkbook/Flights",
    //       },
    //       {
    //         title: "Feature Delivery Lead Time",
    //         route: "featureDeliveryLeadTime",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "Sprint Predictability/Volatility",
    //         route: "sprintPredict",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       ,
    //       {
    //         title: "PI Predictability/Volatility",
    //         route: "piPredict",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "High & Medium Defect Backlog",
    //         route: "defectBacklog",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "New High Defects",
    //         route: "newDefects",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //     ],
    //   },
    //   {
    //     panel_id: "PORT_DETAIL_VIZ1",
    //     panel_header_title: "Team-level Diagnostics",
    //     title_action_type: "Level 2",
    //     title_action_url:
    //       "http://public.tableau.com/views/RegionalSampleWorkbook/College",
    //     focus_area_order: 1,
    //     view_thumbnail_path: "",
    //     view_display_name: "Team-level Diagnostics",
    //     route: "teamDiagnostics",
    //     items: [
    //       {
    //         title: "Story Cycle Time",
    //         route: "storyCycleTime",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "Story Single Cycle Probability",
    //         route: "featureFirstCycle",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "Story Latency (Segmented)",
    //         route: "storyLatency",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       ,
    //       {
    //         title: "Story Total Lead Time",
    //         route: "storyLatency",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "Story Throughput",
    //         route: "storyThroughput",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //     ],
    //   },
    //   {
    //     panel_id: "PORT_DETAIL_VIZ1",
    //     panel_header_title: "Program-level Diagnostics",
    //     title_action_type: "Level 2",
    //     title_action_url:
    //       "http://public.tableau.com/views/RegionalSampleWorkbook/College",
    //     focus_area_order: 1,
    //     view_thumbnail_path: "",
    //     view_display_name: "Program-level Diagnostics",
    //     route: "ProgramDiagnostics",
    //     items: [
    //       {
    //         title: "Feature Cycle Time",
    //         route: "featureCycleTime",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "Feature Total Lead Time",
    //         route: "featureLeadTime",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "Feature Latency (Segmented)",
    //         route: "featureLatency",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       ,
    //       {
    //         title: "Feature Throughput",
    //         route: "featureThroughput",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "Feature Completion on First Cycle",
    //         route: "featureFirstCycle",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //     ],
    //   },
    //   {
    //     panel_id: "PORT_DETAIL_VIZ1",
    //     panel_header_title: "Work Tracking and Forecasting",
    //     title_action_type: "Level 2",
    //     title_action_url:
    //       "http://public.tableau.com/views/RegionalSampleWorkbook/College",
    //     focus_area_order: 1,
    //     view_thumbnail_path: "",
    //     view_display_name: "Work Tracking and Forecasting",
    //     route: "workTracking",
    //     items: [
    //       {
    //         title: "Velocity",
    //         route: "storyVelocity",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //     ],
    //   },
    //   {
    //     panel_id: "PORT_DETAIL_VIZ1",
    //     panel_header_title: "Census",
    //     title_action_type: "Level 2",
    //     title_action_url:
    //       "http://public.tableau.com/views/RegionalSampleWorkbook/College",
    //     focus_area_order: 1,
    //     view_thumbnail_path: "",
    //     view_display_name: "Census",
    //     route: "census",
    //     items: [
    //       {
    //         title: "Team Count",
    //         route: "teamCount",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "Team Size",
    //         route: "teamSize",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "Team Locations",
    //         route: "teamLocations",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //       {
    //         title: "Team Members Mix",
    //         route: "teamMembers",
    //         level: 3,
    //         level2_action_url: "",
    //         level3_action_url: "",
    //       },
    //     ],
    //   },
    // ],
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
