const level2PanelDefs = {
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
          embed_url:
            "http://public.tableau.com/views/RegionalSampleWorkbook/College",
          primary_sheet_name: "Delivery_Lead_Time_Metrics_Bar_Chart_AMP_WS",
          viz_info_id: "PORT_L2_1_VIZ1_INFO",
          restricted: false,
          width_of_12: 12,
          disable_on_filter: [],
          filter_mapping: [
            {
              id: "Hierarchies",
              value: "Hierarchies",
              tableau_type: "Filter",
            },
            {
              id: "Portfolio",
              value: "Cosa",
              tableau_type: "Filter",
            },
            {
              id: "Project",
              value: "Program",
              tableau_type: "Filter",
            },
            {
              id: "SVS",
              value: "Portfolio",
              tableau_type: "Filter",
            },
            {
              id: "Team",
              value: "Team",
              tableau_type: "Filter",
            },
            {
              id: "TIABusinessPortfolio",
              value: "Portfolio",
              tableau_type: "Filter",
            },
            {
              id: "TIACosa",
              value: "Cosa",
              tableau_type: "Filter",
            },
            {
              id: "TIAProgram",
              value: "Program",
              tableau_type: "Filter",
            },
            {
              id: "TIATeam",
              value: "Team",
              tableau_type: "Filter",
            },
          ],
        },
      ],
      embedded_fields: [
        {
          field_id: "PORT_L2_1_VIZ1_GRAPH",
          field_impact_type: "URL",
          field_label: null,
          field_location: "Header",
          field_type: "Switch",
          field_impact_field: null,
          field_impact_parameter: null,
          field_default_value:
            "http://public.tableau.com/views/RegionalSampleWorkbook/College",
          embedded_field_options: [
            {
              text: "Bar",
              value:
                "http://public.tableau.com/views/RegionalSampleWorkbook/College",
              option_order: 1,
              option_thumbnail: null,
            },
            {
              text: "Box",
              value:
                "http://public.tableau.com/views/RegionalSampleWorkbook/Flights",
              option_order: 2,
              option_thumbnail: "",
            },
          ],
        },
        {
          field_id: "PORT_L2_1_VIZ1_DUR",
          field_impact_type: "Parameter",
          field_label: "Only incl. duration >= (in days)",
          field_location: "Top Left",
          field_type: "Numeric",
          field_impact_field: null,
          field_impact_parameter: "Days_cut_off",
          field_default_value: "1",
          embedded_field_options: [
            {
              text: null,
              value: null,
              option_order: null,
              option_thumbnail: null,
            }
          ],
        }
      ],
    },
    {
      view_id: "PORT_1_L2",
      panel_id: "PORT_L2_1_VIZ2",
      detail_link_url: "http://go/somewhere",
      title_action: "none",
      title_action_code: null,
      max_version: null,
      is_max_version: false,
      panel_header_title: "Sprint Metrics",
      header_css_class: "panelPortfolio",
      embedded_viz: [
        {
          viz_id: "PORT_L2_1_TABVIZ2",
          embed_url:
            "http://public.tableau.com/views/RegionalSampleWorkbook/Flights",
          primary_sheet_name: "Delivery_Lead_Time_Metrics_Bar_Chart_AMP_WS",
          viz_info_id: "PORT_L2_1_VIZ1_INFO",
          restricted: false,
          width_of_12: 12,
          disable_on_filter: [],
          filter_mapping: [
            {
              id: "Hierarchies",
              value: "Hierarchies",
              tableau_type: "Filter",
            },
            {
              id: "Portfolio",
              value: "Cosa",
              tableau_type: "Filter",
            },
            {
              id: "Project",
              value: "Program",
              tableau_type: "Filter",
            },
            {
              id: "SVS",
              value: "Portfolio",
              tableau_type: "Filter",
            },
            {
              id: "Team",
              value: "Team",
              tableau_type: "Filter",
            },
            {
              id: "TIABusinessPortfolio",
              value: "Portfolio",
              tableau_type: "Filter",
            },
            {
              id: "TIACOSA",
              value: "Cosa",
              tableau_type: "Filter",
            },
            {
              id: "TIAProgram",
              value: "Program",
              tableau_type: "Filter",
            },
            {
              id: "TIATeam",
              value: "Team",
              tableau_type: "Filter",
            },
          ],
        },

        // //Current Filter object
        // {
        //   "Hierarchies": "Business",
        //   "TIABusinessPortfolio": ["", ""],
        //   "TIACosa": ["", ""],
        //   "TIAProgram": ["", ""],
        //   "TIATeam": ["", ""]
        // }
        // //New Filter Object
        // {
        //   "Hierarchies": "Business",
        //   "Portfolio": ["", ""],
        //   "cosa": ["", ""],
        //   "Program": ["", ""],
        //   "Team": ["", ""]
        // }
      ],
      embedded_fields: [
        {
          field_id: "PORT_L2_1_VIZ2_DATE",
          field_impact_type: "Parameter",
          field_label: "Sprint End Date",
          field_location: "Top Left",
          field_type: "Dropdown",
          field_impact_field: null,
          field_impact_parameter: null,
          field_default_value: "Last_13_Months",
          embedded_field_options: [
            {
              text: "Last 1 Month",
              value: "Last_1_Month",
              option_order: 1,
              option_thumbnail: null,
            },
            {
              text: "Last 2 Month",
              value: "Last_2_Month",
              option_order: 2,
              option_thumbnail: null,
            },
          ],
        },
      ],
    },
  ],
};

module.exports = { level2PanelDefs };
