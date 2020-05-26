const newFiltersResponse = [
  {
    level: 0,
    filterId: "Hierarchies",
    title: "Hierarchies",
    filterType: "Dropdwon",
    parentFilterId: null,
    values: [
      {
        filterOptionId: "legcy",
        filter_value_text: "legcy",
        filter_display_text: "legcy",
        order: 1,
        parentFilterOptionId: null,
      },
      {
        filterOptionId: "Business",
        filter_value_text: "Business",
        filter_display_text: "Business",
        order: 2,
        parentFilterOptionId: null,
      },
    ],
  },
  {
    level: 1,
    filterId: "COSA",
    title: "COSA",
    filterType: "Multi-Select",
    parentFilterId: "Hierarchies",
    values: [
      {
        filterOptionId: "Bank1",
        filter_value_text: "Bank",
        filter_display_text: "Bank",
        order: 1,
        parentFilterOptionId: "Business",
      },
      {
        filterOptionId: "Business Of IT",
        filter_value_text: "Business Of IT",
        filter_display_text: "Business Of IT",
        order: 2,
        parentFilterOptionId: "Business",
      },
    ],
  },
];

module.exports = { newFiltersResponse };
