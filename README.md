# Liangxiao Hu's homepage

Personal academic homepage built with Jekyll for GitHub Pages.

## Files

- `_pages/about.md`: homepage content, publications, experiences, and contact.
- `_layouts/home.html`: profile sidebar and page layout.
- `assets/css/home.css`, `assets/css/home-fonts.css`: styles and local fonts.
- `assets/js/home.js`: theme switching.
- `images/`: portrait, research previews, and institution logos.
- `GaussianAvatar.html`, `assets/GaussianAvatar/`: standalone project page and media.

## Local development

Install Ruby and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve --config _config.yml,_config.dev.yml
```

Open http://localhost:4000. GitHub Pages uses `_config.yml` for production.
The homepage retains the `/about/` and `/about.html` redirects.

Font licenses and attribution are kept in `assets/fonts/`. Original template
license is retained in `LICENSE`.
