import express from "express";
import { deleteUser, updateUser, userDetail } from "@services/user.service";
import { authorization, verifyToken } from "@middlewares/auth";
import { validation } from "@middlewares/validation";
import { updateUserSchema, userIdSchema } from "@validation/user";

const router = express.Router();

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const user = req.body.user;

    const userData = await userDetail({ id: user.id });

    res.status(200).json({
      ...userData,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validation(userIdSchema),
  verifyToken,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const userData = await userDetail({ id });

      res.status(200).json({
        ...userData,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validation(userIdSchema),
  verifyToken,
  authorization,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      await deleteUser({ id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validation(updateUserSchema),
  verifyToken,
  authorization,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const userData = await updateUser({ id, name, email });

      res.status(200).json({
        ...userData,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
