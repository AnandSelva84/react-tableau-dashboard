export const panels = [
  {
    title: "Effectivness (KPIs)",
    route: 'effectivness',
    level: 2,
    items: [
      {
        title: "Story Delivery Lead Time",
        route: 'storyDeliveryTime',
        level: 3
      },
      {
        title: "Feature Delivery Lead Time",
        route: 'featureDeliveryLeadTime',
        level: 3
      },
      {
        title: "Sprint Predictability/Volatility",
        route: 'sprintPredict',
        level: 3
      },
      ,
      {
        title: "PI Predictability/Volatility",
        route: 'piPredict',
        level: 3
      },
      {
        title: "High & Medium Defect Backlog",
        route: 'defectBacklog',
        level: 3
      },
      {
        title: "New High Defects",
        route: 'newDefects',
        level: 3
      }
    ],
  },

  {
    title: "Team-level Diagnostics",
    route: 'teamDiagnostics',
    level: 2,
    items: [
      {
        title: "Story Cycle Time",
        route: 'storyCycleTime',
        level: 3
      },
      {
        title: "Story Single Cycle Probability",
        route: 'featureFirstCycle',
        level: 3
      },
      {
        title: "Story Latency (Segmented)",
        route: 'storyLatency',
        level: 3
      },
      ,
      {
        title: "Story Total Lead Time",
        route: 'storyLatency',
        level: 3
      },
      {
        title: "Story Throughput",
        route: 'storyThroughput',
        level: 3
      }
    ]
  },

];
