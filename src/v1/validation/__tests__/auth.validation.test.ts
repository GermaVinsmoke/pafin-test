import request from "supertest";
import app from "../../../../app";

describe("auth.validation", () => {
  it("should validate the request body", async () => {
    const payloads = [
      {
        error: "Name is required",
        body: {
          email: "test@test.com",
          password: "Test@123",
          confirmPassword: "Test@123",
        },
      },
      {
        error: "Must be a valid email",
        body: {
          name: "Test User",
          email: "testtestcom",
          password: "Test@123",
          confirmPassword: "Test@123",
        },
      },
      {
        error: "Invalid password",
        body: {
          name: "Test User",
          email: "testtestcom",
          password: "Test123",
          confirmPassword: "Test123",
        },
      },
    ];

    for (const payload of payloads) {
      const response = await request(app)
        .post("/auth/signup")
        .send(payload.body);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(payload.error);
    }
  });
});
