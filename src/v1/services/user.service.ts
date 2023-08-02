import {
  deleteUserQuery,
  getUserDetail,
  updateUserQuery,
} from "@repositories/user.repository";
import { notFound } from "@utils/error";
import { IUpdateUser, IUserDetail } from "@interfaces/user";

const userDetail = async ({ id }: IUserDetail) => {
  const userRes = await getUserDetail(id);

  if (!userRes?.rowCount) {
    throw notFound("User not found");
  }

  return {
    ...userRes.rows[0],
  };
};

const deleteUser = async ({ id }: IUserDetail) => {
  const userRes = await deleteUserQuery(id);

  if (!userRes?.rowCount) {
    throw notFound("User not found");
  }

  return true;
};

const updateUser = async ({ id, name, email }: IUpdateUser) => {
  const userRes = await updateUserQuery(id, name, email);

  if (!userRes?.rowCount) {
    throw notFound("User not found");
  }

  return {
    ...userRes.rows[0],
  };
};

export { userDetail, deleteUser, updateUser };
