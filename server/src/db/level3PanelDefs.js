const level3PanelDefs = {
  panel_definitions: [
    {
      view_id: "PORT_11_L3",
      panel_id: "PORT_L2_1_VIZ1_MAX",
      detail_link_url: "http://go/somewhere",
      title_action: "none",
      title_action_code: null,
      max_version: null,
      is_max_version: false,
      panel_header_title: "sprint Predictability",
      header_css_class: "panelPortfolio",
      embedded_viz: [
        {
          viz_id: "PORT_L2_1_TABVIZ1",
          embed_url:
            "http://public.tableau.com/views/RegionalSampleWorkbook/College",
          primary_sheet_name: null,
          viz_info_id: "PORT_L3_11_TABVIZ",
          restricted: false,
          width_of_12: 12,
          disable_on_filter: [],
          filter_mapping: [],
        },
      ],
      embedded_fields: [],
    },
  ],
};

module.exports = { level3PanelDefs };
