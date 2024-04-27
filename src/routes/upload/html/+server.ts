import { JSDOM } from "jsdom";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
    const {
        window: { document },
    } = new JSDOM(await request.text());

    return new Response();
};
