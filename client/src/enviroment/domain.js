export const getDomain = () => {
  const ampID = "3000";
  const kidID = "4000";

  let enviroment = "dev"; // in your side it would be client
  let fullURL = enviroment === "dev" ? window.location.href : "";

  let lastColon = fullURL.lastIndexOf(":");
  let afterCut = fullURL.substr(lastColon, fullURL.length);
  let firstSlash = afterCut.search("/");

  const domain = afterCut.substr(1, firstSlash - 1);
  if (domain === ampID) return "amp";
  if (domain === kidID) return "kid";
  else return null;
};
