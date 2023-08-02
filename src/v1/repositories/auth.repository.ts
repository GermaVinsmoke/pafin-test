import makeQuery from "@utils/makeQuery";

const checkExistingUser = (email: string) => {
  return makeQuery('SELECT * FROM "user" WHERE email = $1', [email]);
};

const insertUser = (name: string, email: string, password: string) => {
  return makeQuery(
    'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, password]
  );
};

export { checkExistingUser, insertUser };
