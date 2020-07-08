export const getDomain = () => {
  const ampID = "3001";
  const kidID = "4000";

  const fullURL = window.location.href;
  let lastColon = fullURL.lastIndexOf(":");
  let afterCut = fullURL.substr(lastColon, fullURL.length);
  let firstSlash = afterCut.search("/");

  const domain = afterCut.substr(1, firstSlash - 1);
  if (domain === ampID) return "amp";
  if (domain === kidID) return "kid";
  else return null;
};
