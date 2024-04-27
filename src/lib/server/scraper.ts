import { SCRAPER_KEY } from "$env/static/private";

export async function getCourses(id: string, code: string) {
    const url = new URL("https://scraper.12308978.xyz/scrape");
    url.searchParams.append("apiKey", SCRAPER_KEY);
    url.searchParams.append("id", id);
    url.searchParams.append("code", code);

    return await (await fetch(url)).text();
}
