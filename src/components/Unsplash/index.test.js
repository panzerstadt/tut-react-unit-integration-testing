import { urls } from "../Unsplash";

// the mock of the "unsplash-js" library should
// have all the properties that make it possible
// to call its api and return results
jest.mock("unsplash-js", () => ({
  __esModule: true, //https://remarkablemark.org/blog/2018/06/28/jest-mock-default-named-export/
  default: jest.fn(() => ({
    search: {
      photos: jest.fn(() => ({
        json: jest.fn(() =>
          Promise.resolve({
            results: Array.from(Array(10)).map((v, i) => ({
              urls: { regular: `url-stub-${i}` }
            }))
          })
        )
      }))
    }
  }))
}));

describe("Unsplash API", () => {
  test("it should return a different url each time urls() is called", async () => {
    // Arrange
    const searchTerm = "inspirational";

    // Act
    const getImg = urls(searchTerm); // thunk
    const img1 = await getImg();
    const img2 = await getImg();

    // Assert
    expect(img1).not.toEqual(img2);
  });
});
