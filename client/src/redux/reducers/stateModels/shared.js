const sharedState = {
  currentApp: "amp",
  drawer: false,
  filterState: [
    {
      ID: "Business",
      id: "Hierarchies",
      lvl: 0,
      parentId: null,
      value: "Business",
    },
  ],
  filters: [
    //id stays the same but the dependency become parentId and title becomes name
    { id: "name", values: ["ali", "charly"], title: "Types" },
    { id: "age", values: ["20", "30"], title: "SubTypes", dependancy: "name" },
  ],
  darkMode: false,
  appIsLoading: true,
  app: null,
  newFilters: [],
  savedFilters: [],
  appliedFilters: [
    {
      ID: "Business",
      id: "Hierarchies",
      lvl: 0,
      parentId: null,
      value: "Business",
    },
  ],
  body_class: null,
  hasAllSelected: [],
  currentMainFilter: "Business",
};

export default sharedState;
