const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
//FIX - not pass
describe("JSON", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content type", /application\/json/);
  }, 10000);
});

test("there are two notes", async () => {
  jest.setTimeout(30000);
  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(2);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  expect(response.body[0].content).toBe("HTML is Easy");
});

afterAll(() => {
  mongoose.connection.close();
});
