import { setupWorker } from "msw/browser";
import { contactHandlers } from "./handlers/contact";

export const worker = setupWorker(...contactHandlers);
