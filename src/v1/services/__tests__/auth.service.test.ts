import bcrypt from "bcrypt";
import { login, signup } from "../auth.service";
import {
  checkExistingUser,
  insertUser,
} from "../../repositories/auth.repository";
import { badRequest, unauthorized } from "../../utils/error";
import { generateAccessToken } from "../../utils/generateAccessToken";

jest.mock("../../repositories/auth.repository", () => ({
  checkExistingUser: jest.fn(),
  insertUser: jest.fn(),
}));

jest.mock("../../utils/error", () => ({
  badRequest: jest.fn(),
  unauthorized: jest.fn(),
}));

jest.mock("../../utils/generateAccessToken", () => ({
  generateAccessToken: jest.fn(),
}));

jest.spyOn(bcrypt, "compare");

describe("auth signup service", () => {
  const body = {
    name: "Test User",
    email: "test@test.com",
    password: "Test@123",
    confirmPassword: "Test@123",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw user exists error", async () => {
    (checkExistingUser as jest.Mock).mockResolvedValueOnce({
      rowCount: 1,
    });
    (badRequest as jest.Mock).mockReturnValueOnce({
      error: "User already exists",
    });

    try {
      await signup(body);
    } catch (error) {
      expect(error).toHaveProperty("error", "User already exists");
    }
  });

  it("should throw passwords do not match error", async () => {
    (checkExistingUser as jest.Mock).mockResolvedValueOnce({
      rowCount: 0,
    });
    (badRequest as jest.Mock).mockReturnValueOnce({
      error: "Passwords do not match",
    });

    try {
      await signup({ ...body, confirmPassword: "Test@1234" });
    } catch (error) {
      expect(error).toHaveProperty("error", "Passwords do not match");
    }
  });

  it("should return access token", async () => {
    const id = "1";
    const accessToken = "test-access-token";

    (checkExistingUser as jest.Mock).mockResolvedValueOnce({
      rowCount: 0,
    });
    (insertUser as jest.Mock).mockResolvedValueOnce({
      rows: [
        {
          id,
          name: body.name,
          email: body.email,
        },
      ],
    });
    (generateAccessToken as jest.Mock).mockReturnValueOnce(accessToken);

    const response = await signup(body);

    expect(response).toHaveProperty("accessToken", accessToken);
    expect(response).toHaveProperty("userData.id", id);
  });
});

describe("auth login service", () => {
  const body = {
    email: "test@test.com",
    password: "Test@123",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw invalid credentials error in case user doesn't exist", async () => {
    (checkExistingUser as jest.Mock).mockResolvedValueOnce({
      rowCount: 0,
    });
    (unauthorized as jest.Mock).mockReturnValueOnce({
      error: "Invalid credentials",
    });

    try {
      await login(body);
    } catch (error) {
      expect(error).toHaveProperty("error", "Invalid credentials");
    }
  });

  it("should throw invalid credentials error in case password doesn't match", async () => {
    (checkExistingUser as jest.Mock).mockResolvedValueOnce({
      rowCount: 1,
      rows: [
        {
          password: "Test@1234",
        },
      ],
    });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);
    (unauthorized as jest.Mock).mockReturnValueOnce({
      error: "Invalid credentials",
    });

    try {
      await login(body);
    } catch (error) {
      expect(error).toHaveProperty("error", "Invalid credentials");
    }
  });

  it("should return access token", async () => {
    const id = "1";
    const name = "Test User";
    const accessToken = "test-access-token";

    (checkExistingUser as jest.Mock).mockResolvedValueOnce({
      rowCount: 1,
      rows: [
        {
          id,
          name,
          email: body.email,
          password: body.password,
        },
      ],
    });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
    (generateAccessToken as jest.Mock).mockReturnValueOnce(accessToken);

    const response = await login(body);

    expect(response).toHaveProperty("accessToken", accessToken);
    expect(response).toHaveProperty("userData.id", id);
  });
});
