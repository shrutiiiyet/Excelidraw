import { client } from "../index";

export const createUser = async (
  email: string,
  hashedPassword: string,
  name: string
) => {
  return client.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await client.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserById = async (id: string) => {
  return await client.user.findUnique({
    where: {
      id,
    },
  });
};