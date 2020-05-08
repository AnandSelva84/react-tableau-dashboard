const filterResponse = {
  filters: [
    {
      lvl: 0,
      title: "Level 0",
      values: [
        {
          id: 1,
          name: "Lgacy",
          parentId: null,
        },
        {
          id: 2,
          name: "business",
          parentId: null,
        },
      ],
    },
    {
      lvl: 1,
      title: "Legacy - Level 1",
      values: [
        {
          id: 3,
          name: "L1 - Type 3",
          parentId: 1,
        },
        {
          id: 4,
          name: "L1 - Type 4",
          parentId: 1,
        },
      ],
    },
    {
      lvl: 1,
      title: "Business - Level 1",
      values: [
        {
          id: 5,
          name: "L1 - Type 5",
          parentId: 2,
        },
      ],
    },
    {
      lvl: 2,
      title: "Legacy - Level 2",
      values: [
        {
          id: 6,
          name: "L2 Type 6",
          parentId: 3,
        },
      ],
    },
    {
      lvl: 2,
      title: "Business - L2",
      values: [
        {
          id: 7,
          name: "L2 - Type 7",
          parentId: 4,
        },
        {
          id: 8,
          name: "L2 - Type 5",
          parentId: 5,
        },
      ],
    },
    {
      lvl: 3,
      title: "Legacy Level 3",
      values: [
        {
          id: 9,
          name: "L3 - T1",
          parentId: 6,
        },
      ],
    },
    {
      lvl: 3,
      title: "Business Level 3",
      values: [
        {
          id: 10,
          name: "L3 - T2",
          parentId: 7,
        },
        {
          id: 11,
          name: "L3 - T3",
          parentId: 8,
        },
      ],
    },
  ],
  dynamicFilters: [
    {
      id: 1,
      title: "Hirerarchy",
      text: "Legacy",
      parentId: null,
      sortOrder: 1,
    },
    {
      id: 2,
      title: "Hirerarchy",
      text: "Business",
      parentId: null,
      sortOrder: 2,
    },
    {
      id: 3,
      title: "IT Portfolio",
      text: "Business Of IT",
      parentId: 1,
      sortOrder: 1,
    },
    {
      id: 4,
      title: "IT Portfolio",
      text: "Corp Applications",
      parentId: 1,
      sortOrder: 2,
    },
    {
      id: 5,
      title: "COSA",
      text: "Bank",
      parentId: 2,
      sortOrder: 1,
    },
    {
      id: 6,
      title: "COSA",
      text: "CAO",
      parentId: 1,
      sortOrder: 2,
    },
    {
      id: 7,
      title: "COSA",
      text: "CFO",
      parentId: 2,
      sortOrder: 3,
    },
    {
      id: 8,
      title: "Solution Value Team",
      text: "Bank Operations",
      parentId: 3,
      sortOrder: 1,
    },
    {
      id: 9,
      title: "Solution Value Team",
      text: "Consumer Lending",
      parentId: 3,
      sortOrder: 2,
    },
    {
      id: 10,
      title: "Solution Value Team",
      text: "Bank Operations",
      parentId: 4,
      sortOrder: 1,
    },
    {
      id: 11,
      title: "Solution Value Team",
      text: "Consumer Lending",
      parentId: 4,
      sortOrder: 2,
    },
  ],
};

module.exports = { filterResponse };
