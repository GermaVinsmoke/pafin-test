import makeQuery from "@utils/makeQuery";

const getUserDetail = (id: string) => {
  return makeQuery('SELECT id, name, email FROM "user" WHERE id = $1', [id]);
};

const deleteUserQuery = (id: string) => {
  return makeQuery('DELETE FROM "user" WHERE id = $1', [id]);
};

const updateUserQuery = (id: string, name: string, email: string) => {
  return makeQuery(
    'UPDATE "user" SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
    [name, email, id]
  );
};

export { getUserDetail, deleteUserQuery, updateUserQuery };
