const sharedState = {
  currentApp: "amp",
  drawer: false,
  filterState: [],
  filters: [
    { id: "name", values: ["ali", "charly"], title: "Types" },
    { id: "age", values: ["20", "30"], title: "SubTypes", dependancy: "name" },
  ],
};

export default sharedState;
