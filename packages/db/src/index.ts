import { PrismaClient } from "../generated/prisma/index";

const client = new PrismaClient();

export { client };
export * from "./services/index.js";
