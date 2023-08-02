import express, { Request, Response } from "express";
import { authorization, verifyToken } from "../auth";
import { unauthorized, forbidden } from "../../utils/error";
import request from "supertest";
import app from "../../../../app";

jest.mock("../../utils/error", () => ({
  unauthorized: jest.fn(),
  forbidden: jest.fn(),
}));

describe("auth.middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if no authorization header is present", async () => {
    const req: any = {
      headers: {
        Authorization: "Bearer ",
      },
    };
    const res = {} as Response;
    const next = jest.fn();

    (unauthorized as jest.Mock).mockReturnValueOnce({
      error: "Unauthorized",
    });

    try {
      await verifyToken(req, res, next);
    } catch (error) {
      expect(error).toHaveProperty("error", "Unauthorized");
    }
  });

  it("should throw forbidden error if user id does not match", async () => {
    const tokenId = "1";
    const paramId = "2";

    const req: any = {
      body: {
        user: {
          id: tokenId,
        },
      },
      params: {
        id: paramId,
      },
    };
    const res = {} as Response;
    const next = jest.fn();

    (forbidden as jest.Mock).mockReturnValueOnce({
      error: "Forbidden",
    });

    try {
      authorization(req, res, next);
    } catch (error) {
      expect(error).toHaveProperty("error", "Forbidden");
    }
  });
});
