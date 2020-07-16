const level3PanelDefs = {
  panel_definitions: [
    {
      view_id: "PORT_1_L2",
      panel_id: "PORT_1_L2_VIZ1",
      detail_link_url: "http://go/somewhere",
      title_action: "none",
      title_action_code: null,
      max_version: null,
      is_max_version: false,
      panel_header_title: "Story Delivery Lead Time",
      header_css_class: "panelPortfolio",
      embedded_viz: [
        {
          viz_id: "PORT_L2_1_TABVIZ1",
          embed_url: "http://public.tableau.com/views/RegionalSampleWorkbook/College",
          primary_sheet_name: "Delivery_Lead_Time_Metrics_Bar_Chart_AMP_WS",
          viz_info_id: "PORT_L2_1_VIZ1_INFO",
          restricted: false,
          width_of_12: 12,
          disable_on_filter:[],
          filter_mapping: [
            {
              id: "Hierarchies",
              value: "Hierarchies",
              tableau_type: "Filter"
            },
            {
              id: "Portfolio",
              value: "Cosa",
              tableau_type: "Filter"
            },
            {
              id: "Project",
              value: "Program",
              tableau_type: "Filter"
            },
            {
              id: "SVS",
              value: "Portfolio",
              tableau_type: "Filter"
            },
            {
              id: "Team",
              value: "Team",
              tableau_type: "Filter"
            },
            {
              id: "TIABusinessPortfolio",
              value: "Portfolio",
              tableau_type: "Filter"
            },
            {
              id: "TIACosa",
              value: "Cosa",
              tableau_type: "Filter"
            },
            {
              id: "TIAProgram",
              value: "Program",
              tableau_type: "Filter"
            },
            {
              id: "TIATeam",
              value: "Team",
              tableau_type: "Filter"
            }
          ]
        }
      ],
      embedded_fields: [
        {
          field_id: "PORT_VIZ1_LINK_LIST",
          field_impact_type: "Link List",
          field_label: null,
          field_location: "Top Left",
          field_type: "Link List",
          field_impact_field: null,
          field_impact_parameter: null,
          field_default_value: "",
          embedded_field_options: [
            {
              text: "Story Cycle Time",
              value: "PORT_11_L3",
              option_order: 1,
              option_thumbnail: "",
            },
            {
              text: "Sprint Predictability/Volatility",
              value: "PORT_12_L3",
              option_order: 2,
              option_thumbnail: "",
            },
          ],
        },
      ],
    },
  ],
};

module.exports = { level3PanelDefs };
