const positionStyles = {
  headerStyle: {
    top: "8px",
    translate: "transform(-50%,-50%)",
    left: "50%",
    width: "285",
  },
  TopLeftStyle: { top: "4rem", left: "24px", width: "28%" },
  TopRightStyle: { top: "4rem", Right: "24px", width: "28%" },
};

export const stylePosition = (position) => {
  switch (position) {
    case "Header":
      return positionStyles.headerStyle;
    case "Top Left":
      return positionStyles.TopLeftStyle;
    case "Top Right":
      return positionStyles.TopRightStyle;
  }
};
