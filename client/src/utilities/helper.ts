export const parseVideoIdFromYoutubeLink = (link: string) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = link.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};
