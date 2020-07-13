const panelDefs = {
  panel_definitions: [
    {
      view_id: "AMP_L1",
      panel_id: "PORT_DETAIL_VIZ1",
      detail_link_url: null,
      title_action: "Level 2",
      title_action_code: "PORT_1_L2",
      max_version: null,
      is_max_version: false,
      panel_header_title: "Effectiviness (KPIs)",
      header_css_class: "panelPortfolio",
      embedded_viz: [],
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
              value: "",
              option_order: 1,
              option_thumbnail: "",
            },
            {
              text: "Sprint Predictability/Volatility",
              value: "",
              option_order: 2,
              option_thumbnail: "",
            },
          ],
        },
      ],
    },
  ],
};

module.exports = { panelDefs };
