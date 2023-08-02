import request from "supertest";
import app from "../../../../app";

describe("user.validation", () => {
  it("should validate the request body", async () => {
    const payloads = [
      {
        error: "Name is required",
        body: {
          email: "test@test.com",
        },
        params: {
          id: "1",
        },
        errorCode: 400,
      },
      {
        error: "Must be a valid email",
        body: {
          name: "Test User",
          email: "testtestcom",
        },
        params: {
          id: "1",
        },
        errorCode: 400,
      },
    ];

    for (const payload of payloads) {
      const id = payload.params.id;
      const response = await request(app).put(`/user/${id}`).send(payload.body);

      expect(response.status).toBe(payload.errorCode);
      expect(response.body.error).toBe(payload.error);
    }
  });
});
