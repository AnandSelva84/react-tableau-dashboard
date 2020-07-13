const newFiltersResponse = {
  metadata: {
    swagger: "2.0",
  },
  filters: [
    //Level - 1 - Top level
    {
      level: 1,
      filter_id: "Hierarchies",
      title: "Hierarchies",
      filter_type: "Dropdwon",
      parent_filter: null,
      values: [
        {
          filter_option: "Legacy",
          filter_value: "Legacy",
          filter_display_text: "Legacy",
          order: 1,
          parent_filter_option: null,
        },
        {
          filter_option: "Business",
          filter_value: "Business",
          filter_display_text: "Business",
          order: 2,
          parent_filter_option: null,
        },
      ],
    },
    //Level - 2 - Legacy
    {
      level: 2,
      filter_id: "Portfolio",
      title: "IT Portfolio",
      filter_type: "Multi-Select",
      parent_filter: "Hierarchies",
      values: [
        {
          filter_option: "Legacy_Bank",
          filter_value: "Bank",
          filter_display_text: "Bank",
          order: 1,
          parent_filter_option: "Legacy",
        },
        {
          filter_option: "Legacy_Business_of_IT",
          filter_value: "Business Of IT",
          filter_display_text: "Business Of IT",
          order: 2,
          parent_filter_option: "Legacy",
        },
      ],
    },
    //Level - 3 - Legacy
    {
      level: 3,
      filter_id: "SVS",
      title: "Solution Value Stream",
      filter_type: "Multi-Select",
      parent_filter: "Portfolio",
      values: [
        {
          filter_option: "Legacy_Bank_Omni_Channel",
          filter_value: "Bank Omni Channel",
          filter_display_text: "Bank",
          order: 1,
          parent_filter_option: "Legacy_Bank",
        },
        {
          filter_option: "Legacy_Bank_Operations",
          filter_value: "Bank Opeartions",
          filter_display_text: "Bank Operations",
          order: 2,
          parent_filter_option: "Legacy_Bank",
        },
        {
          filter_option: "Legacy_Other_(Business_of_IT)",
          filter_value: "Other (Business of IT)",
          filter_display_text: "Other (Business of IT)",
          order: 3,
          parent_filter_option: "Legacy_Business_of_IT",
        },
      ],
    },
    //Level - 4 - Legacy
    {
      level: 4,
      filter_id: "Project",
      title: "JIRA Project Name",
      filter_type: "Multi-Select",
      parent_filter: "SVS",
      values: [
        {
          filter_option: "Legacy_Bank_OMNI_IT_ART",
          filter_value: "Bank Omni - IT ART",
          filter_display_text: "Bank Omni - IT ART",
          order: 1,
          parent_filter_option: "Legacy_Bank_Omni_Channel",
        },
        {
          filter_option: "Legacy_Bank_AML_Program",
          filter_value: "Bank AML Program",
          filter_display_text: "Bank AML Program",
          order: 2,
          parent_filter_option: "Legacy_Bank_Omni_Channel",
        },
      ],
    },
    //Level - 5 - Legacy
    {
      level: 5,
      filter_id: "Team",
      title: "Team Name",
      filter_type: "Multi-Select",
      parent_filter: "Project",
      values: [
        {
          filter_option:
            "Legacy_Info_not_available_(_Agile_Process_Configuration_V1.0)",
          filter_value:
            "Info not available (_Agile Process Configuration V1.0)",
          filter_display_text:
            "Info not available (_Agile Process Configuration V1.0)",
          order: 1,
          parent_filter_option: "Legacy_Bank_OMNI_IT_ART",
        },
        {
          filter_option:
            "Legacy_Info_not_available_(_Recycle_Bin_Process_Agile_V1.0)",
          filter_value: "Info not available (__Recycle Bin Process Agile V1)",
          filter_display_text:
            "Info not available (__Recycle Bin Process Agile V1)",
          order: 2,
          parent_filter_option: "Legacy_Bank_AML_Program",
        },
      ],
    },

    //Level -2 - Business
    {
      level: 2,
      filter_id: "TIACOSA",
      title: "COSA",
      filter_type: "Multi-Select",
      parent_filter: "Hierarchies",
      values: [
        {
          filter_option: "Business_Bank",
          filter_value: "Bank",
          filter_display_text: "Bank",
          order: 1,
          parent_filter_option: "Business",
        },
        {
          filter_option: "Business_CAO",
          filter_value: "CAO",
          filter_display_text: "CAO",
          order: 2,
          parent_filter_option: "Business",
        },
      ],
    },
    //Level -3 - Business
    {
      level: 3,
      filter_id: "TIABusinessPortfolio",
      title: "Business Portfolio",
      filter_type: "Multi-Select",
      parent_filter: "TIACosa",
      values: [
        {
          filter_option: "Business_Bank_AML",
          filter_value: "Bank AML",
          filter_display_text: "Bank AML",
          order: 1,
          parent_filter_option: "Business_Bank",
        },
        {
          filter_option: "Business_Bank_AML_2",
          filter_value: "Bank AML 2",
          filter_display_text: "Bank AML 2",
          order: 3,
          parent_filter_option: "Business_Bank",
        },
        {
          filter_option: "Business_AML",
          filter_value: "AML",
          filter_display_text: "AML",
          order: 2,
          parent_filter_option: "Business_CAO",
        },
        {
          filter_option: "Business_AML_2",
          filter_value: "AML 2",
          filter_display_text: "AML 2",
          order: 2,
          parent_filter_option: "Business_CAO",
        },
      ],
    },
    //Level -4 - Business
    {
      level: 4,
      filter_id: "TIAProgram",
      title: "Program Name",
      filter_type: "Multi-Select",
      parent_filter: "TIABusinessPortfolio",
      values: [
        {
          filter_option: "Business_Bank_AML_IT_Solutions",
          filter_value: "Bank AML IT Solutions",
          filter_display_text: "Bank AML IT Solutions",
          order: 1,
          parent_filter_option: "Business_Bank_AML",
        },
        {
          filter_option: "Business_Bank_AML_IT_Solutions_2",
          filter_value: "Bank AML IT Solutions 2",
          filter_display_text: "Bank AML IT Solutions 2",
          order: 2,
          parent_filter_option: "Business_Bank_AML_2",
        },
        {
          filter_option: "Bank_AML",
          filter_value: "Bank AML ",
          filter_display_text: "Bank AML  ",
          order: 3,
          parent_filter_option: "Business_AML",
        },
        {
          filter_option: "Bank_AML_2",
          filter_value: "Bank AML  2",
          filter_display_text: "Bank AML  2",
          order: 4,
          parent_filter_option: "Business_AML_2",
        },
      ],
    },
    //Level -5 - Business
    {
      level: 5,
      filter_id: "TIATeam",
      title: "Team Name",
      filter_type: "Multi-Select",
      parent_filter: "TIAProgram",
      values: [
        {
          filter_option: "Business_AML_System_Teams",
          filter_value: "AML System Teams",
          filter_display_text: "AML System Teams",
          order: 1,
          parent_filter_option: "Business_Bank_AML_IT_Solutions",
        },
        {
          filter_option: "Business_AML_System_Teams_2",
          filter_value: "AML System Teams 2 ",
          filter_display_text: "AML System Teams 2",
          order: 2,
          parent_filter_option: "Business_Bank_AML_IT_Solutions_2",
        },
        {
          filter_option: "Bank_AML_Team",
          filter_value: "AML System Teams 2 ",
          filter_display_text: "AML System Teams 2",
          order: 2,
          parent_filter_option: "Bank_AML",
        },
        {
          filter_option: "Bank_AML_Team_2",
          filter_value: "BANK AML System Teams 2 ",
          filter_display_text: "BANK AML System Teams 2",
          order: 2,
          parent_filter_option: "Bank_AML_2",
        },
        {
          filter_option: "Business_AML_System_Teams hello world",
          filter_value: "AML System Teams hello world",
          filter_display_text: "AML System Teams hello world",
          order: 1,
          parent_filter_option: "Business_Bank_AML_IT_Solutions",
        },
        {
          filter_option: "Business_AML_System_Teams_2 hello world",
          filter_value: "AML System Teams 2  hello world",
          filter_display_text: "AML System Teams 2 hello world",
          order: 2,
          parent_filter_option: "Business_Bank_AML_IT_Solutions_2",
        },
        {
          filter_option: "Bank_AML_Team hello world",
          filter_value: "AML System Teams 2  hello world",
          filter_display_text: "AML System Teams 2 hello world",
          order: 2,
          parent_filter_option: "Bank_AML",
        },
        {
          filter_option: "Bank_AML_Team_2 hello world",
          filter_value: "BANK AML System Teams 2  hello world",
          filter_display_text: "BANK AML System Teams 2 hello world",
          order: 2,
          parent_filter_option: "Bank_AML_2",
        },

        {
          filter_option: "Business_AML_System_Teams hello world fkajnkj  ",
          filter_value: "AML System Teams hello world fkajnkj  ",
          filter_display_text: "AML System Teams hello world fkajnkj  ",
          order: 1,
          parent_filter_option: "Business_Bank_AML_IT_Solutions",
        },
        {
          filter_option: "Business_AML_System_Teams_2 hello world fkajnkj  ",
          filter_value: "AML System Teams 2  hello worl fkajnkj  d",
          filter_display_text: "AML System Teams 2 hello w fkajnkj  orld",
          order: 2,
          parent_filter_option: "Business_Bank_AML_IT_Solutions_2",
        },
        {
          filter_option: "Bank_AML_Team hello wo fkajnkj  rld",
          filter_value: "AML System Teams 2  hel fkajnkj  lo world",
          filter_display_text: "AML System Team fkajnkj  s 2 hello world",
          order: 2,
          parent_filter_option: "Bank_AML",
        },
        {
          filter_option: "Bank_AML_Team_2 hello fkajnkj   world",
          filter_value: "BANK AML System Teams 2   fkajnkj  hello world",
          filter_display_text: "BANK AML System Tea fkajnkj  ms 2 hello world",
          order: 2,
          parent_filter_option: "Bank_AML_2",
        },
        {
          filter_option: "Business_AML_System_Teams he knfa llo world fkajnkj  ",
          filter_value: "AML System Teams hello wor knfa ld fkajnkj  ",
          filter_display_text: "AML System Teams he knfa llo world fkajnkj  ",
          order: 1,
          parent_filter_option: "Business_Bank_AML_IT_Solutions",
        },
        {
          filter_option: "Business_AML_System_Teams_ knfa 2 hello world fkajnkj  ",
          filter_value: "AML System Teams 2  hello w knfa orl fkajnkj  d",
          filter_display_text: "AML System Teams 2 h knfa ello w fkajnkj  orld",
          order: 2,
          parent_filter_option: "Business_Bank_AML_IT_Solutions_2",
        },
        {
          filter_option: "Bank_AML_Team hello wo f knfa kajnkj  rld",
          filter_value: "AML System Teams 2  hel f knfa kajnkj  lo world",
          filter_display_text: "AML System Team fk knfa ajnkj  s 2 hello world",
          order: 2,
          parent_filter_option: "Bank_AML",
        },
        {
          filter_option: "Bank_AML_Team_2 hello fkaj knfa nkj   world",
          filter_value: "BANK AML System Teams 2    knfa fkajnkj  hello world",
          filter_display_text: "BANK AML System Tea knfa  fkajnkj  ms 2 hello world",
          order: 2,
          parent_filter_option: "Bank_AML_2",
        },
      ],
    },
  ],
};

module.exports = { newFiltersResponse };
