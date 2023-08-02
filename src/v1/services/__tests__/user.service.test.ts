import { deleteUser, updateUser, userDetail } from "../user.service";
import {
  deleteUserQuery,
  getUserDetail,
  updateUserQuery,
} from "../../repositories/user.repository";
import { notFound } from "../../utils/error";

jest.mock("../../repositories/user.repository", () => ({
  getUserDetail: jest.fn(),
  deleteUserQuery: jest.fn(),
  updateUserQuery: jest.fn(),
}));

jest.mock("../../utils/error", () => ({
  notFound: jest.fn(),
}));

describe("User details", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    (getUserDetail as jest.Mock).mockResolvedValueOnce({
      rowCount: 0,
    });
    (notFound as jest.Mock).mockReturnValueOnce({
      error: "User not found",
    });

    try {
      await userDetail({ id: "1" });
    } catch (error) {
      expect(error).toHaveProperty("error", "User not found");
    }
  });

  it("should return user details", async () => {
    const id = "1";
    const name = "Test User";
    const email = "test@test.com";

    (getUserDetail as jest.Mock).mockResolvedValueOnce({
      rowCount: 1,
      rows: [{ id, name, email }],
    });

    const res = await userDetail({ id });

    expect(res).toHaveProperty("id", id);
    expect(res).toHaveProperty("name", name);
    expect(res).toHaveProperty("email", email);
  });

  it("should update user details", async () => {
    const id = "1";
    const name = "Test User 123";
    const email = "test+1@test.com";

    (updateUserQuery as jest.Mock).mockResolvedValueOnce({
      rowCount: 1,
      rows: [{ id, name, email }],
    });

    const res = await updateUser({ id, name, email });

    expect(res).toHaveProperty("id", id);
    expect(res).toHaveProperty("name", name);
    expect(res).toHaveProperty("email", email);
  });

  it("should delete user", async () => {
    const id = "1";

    (deleteUserQuery as jest.Mock).mockResolvedValueOnce({
      rowCount: 1,
    });

    const res = await deleteUser({ id });

    expect(res).toBe(true);
  });
});
