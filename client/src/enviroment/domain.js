export const getDomain = () => {
  const ampID = "3000";
  const kidID = "4000";

  const fullURL = window.location.href;

  const domain = fullURL.substring(
    fullURL.lastIndexOf(":") + 1,
    fullURL.search("/")
  );
  if (domain === ampID) return "amp";
  if (domain === kidID) return "kid";
  else return null;
};
