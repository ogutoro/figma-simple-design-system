import { setupServer } from "msw/node";
import { contactHandlers } from "./handlers/contact";

export const server = setupServer(...contactHandlers);
