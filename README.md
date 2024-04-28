# mns.sch00l.nz

A community maintained website to support [Miramar North School](https://mns.school.nz).

Currently it contains:

- an overview of digital tools (for new parents!)
- songs our tamariki are learning, to make it easier for whānau to sing along

You can find this deployed at https://mns.sch00l.nz

## Editing

These are the files responsible for generating the website. The main files to care about are:

```
├── README.md             // you are here
├── songs                 // song pages
├── info                  // info pages about this site, school
├── src                   // templates, custom pages
└── docusaurus.config.ts  // main config
```

You can edit pages here on GitHub (you will need an acount), or if you know how to use git + node you can edit locally and suggest changes through merge-requests.

### Local Development

1. install node (recommend using [nvm](https://github.com/nvm-sh/nvm)
2. clone down this repo
3. `npm install`
4. `npm start`

## Deploying the website

This repo is turned into a static site by Github Actions.
Any valid updates to the `main` branch will be deployed automatically.

## Roadmap

- [ ] rasterize the svg text
  - record the font used somewhere
- [ ] enter more songs
- [ ] add a "Contributing" page
- [ ] Improve songs templates
  - [ ] swizzle components? https://docusaurus.io/docs/swizzling/
    - add new front-matter fields?
  - [ ] better multi-line formatting support
    - github flavoured markdown?
    - `<pre>` styling?
  - [ ] nicer translation support
- [ ] drop awkward `songs/index.md`
