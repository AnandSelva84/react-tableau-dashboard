const sharedState = {
  currentApp: "amp",
  drawer: false,
  filterState: [],
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
  appliedFilters: [],
  body_class: "ampBody",
};

export default sharedState;
