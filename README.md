# Anuna-Sis

An improved enlistment experience.

## Contributing

**Warning: This section is not complete. Please talk with me directly if you want to contribute for now.**

Thanks for contributing. The public files here is sufficient to start up your own version of the website, along with the (soon to be) public scraper API from [diego-yason/scraper](https://github.com/diego-yason/scraper).

### Preparations & Notes

#### Scraper

**IMPORTANT:** A scraper is _not_ necessary for contributing to this project. There will eventually be a sample data set for you to use and import to your database for development.

As of now, scraping API is not yet available to the public. [diego-yason/scraper](https://github.com/diego-yason/scraper) to set it up yourself, if interested. You will need to change any urls that point to `scraper.12308978.xyz` to whatever domain your own version of the scraper is hosted on.

#### OAuth sign-in

You do not need to set up Google OAuth. You can use email sign in.
(An interface will be added soon for dev mode, especially for multi-user testing.)

#### Database

I personally opted to **not** use RLS and stick with traditional APIs. You will need to do manual authorization
checks when accessing the database.

[You can view the schema here.](https://dbdiagram.io/d/Anuna-Sis-Live-Schema-66336fb05b24a634d0542bd3)

### Guide

You can refer to to [Supabase docs](https://supabase.com/docs/guides/cli/local-development) on how to set up the local server. I've also included a guide here.

If anything goes wrong in this guide, feel free to contact me.

Requirements:

- [Docker Desktop](https://docs.docker.com/get-docker/)
- [Node v18](https://nodejs.org/en/download)
- pnpm (done via `npm i -g pnpm`)
- NPM Packages (`pnpm i`)

### Approval

Once your pull request is approved, it will be merged into the `dev` branch, as a form of preview of the next version of the website.

## Thanks

Special thanks to Zel for providing the foundations for the scraper found at [diego-yason/scraper](https://github.com/diego-yason/scraper), which this project uses.
