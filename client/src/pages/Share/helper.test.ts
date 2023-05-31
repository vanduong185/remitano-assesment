import { parseVideoIdFromYoutubeLink } from "./helper";

describe("Share helper tests - parseVideoIdFromYoutubeLink", () => {
  it("format url 1", () => {
    const link =
      "https://www.youtube.com/watch?v=9MpO8lw_Rj4&list=RD9MpO8lw_Rj4&start_radio=1";
    expect(parseVideoIdFromYoutubeLink(link)).toEqual("9MpO8lw_Rj4");
  });

  it("format url 2", () => {
    const link = "https://www.youtube.com/watch?v=0hBYyKf17FE";
    expect(parseVideoIdFromYoutubeLink(link)).toEqual("0hBYyKf17FE");
  });

  it("format url 3", () => {
    const link = "https://www.youtube.com/";
    expect(parseVideoIdFromYoutubeLink(link)).toEqual(null);
  });

  it("format url 4", () => {
    const link = "https://www.google.com/v=0hBYyKf1";
    expect(parseVideoIdFromYoutubeLink(link)).toEqual(null);
  });

  it("format url 5", () => {
    const link = "https://www.youtube.com/v=0hBYyKf1";
    expect(parseVideoIdFromYoutubeLink(link)).toEqual(null);
  });

  it("format url 6", () => {
    const link = "";
    expect(parseVideoIdFromYoutubeLink(link)).toEqual(null);
  });
});
