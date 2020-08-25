const positionStyles = {
  headerStyle: {
    top: "3px",
    translate: "transform(-50%,-50%)",
    left: "50%",
    width: "38%",
  },
  TopLeftStyle: { top: "53px", left: "24px", width: "38%" },
  TopRightStyle: { top: "53px", Right: "24px", width: "38%" },
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
