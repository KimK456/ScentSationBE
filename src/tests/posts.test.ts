import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/posts_model";
import { Express } from "express";

let app: Express;

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await postModel.deleteMany();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let postId = "";
describe("Posts Tests", () => {
  test("Test Get All Posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Post", async () => {
    const response = await request(app).post("/posts/").send({
      content: "Test Content",
      owner: "TestOwner",
      username: "TestOwner",
      userImgUrl: "TestOwner"
    });
    expect(response.statusCode).toBe(201);;
    expect(response.body.content).toBe("Test Content");
    expect(response.body.owner).toBe("TestOwner");
    expect(response.body.username).toBe("TestOwner");
    expect(response.body.userImgUrl).toBe("TestOwner");
    postId = response.body._id;
  });

  test("Test Get Post By ID", async () => {
    const response = await request(app).get("/posts/" + postId);
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe("Test Content");
    expect(response.body.owner).toBe("TestOwner");
    expect(response.body.username).toBe("TestOwner");
    expect(response.body.userImgUrl).toBe("TestOwner");
  });

  test("Test Get Post By Owner", async () => {
    const response = await request(app).get("/posts?owner=TestOwner");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].content).toBe("Test Content");
    expect(response.body[0].owner).toBe("TestOwner");
    expect(response.body[0].username).toBe("TestOwner");
    expect(response.body[0].userImgUrl).toBe("TestOwner");
  });

  test("Test Update Post By ID", async () => {
    const response = await request(app).put("/posts/" + postId).send({
      content: "Test Post - New Content",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe("Test Post - New Content");
    expect(response.body.owner).toBe("TestOwner");
    expect(response.body.username).toBe("TestOwner");
    expect(response.body.userImgUrl).toBe("TestOwner");
    postId = response.body._id;
  });


  test("Test Create Post 2", async () => {
    const response = await request(app).post("/posts").send({
      content: "Test Content 2",
      owner: "TestOwner2",
      username: "TestOwner2",
      userImgUrl: "TestOwner2"
    });
    expect(response.statusCode).toBe(201);
  });

  test("Posts test get all 2", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test("Test create post fail", async () => {
    const response = await request(app).post("/posts/").send({
      content: "Test Content 2",
    });
    expect(response.statusCode).toBe(500);
  });
});