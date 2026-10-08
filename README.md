# Peilin's photo website

A plain static site: no build step, no framework. It runs on GitHub Pages as is.

## Files

- `index.html`: the page text (intro, work, about, contact). Edit the words directly.
- `photos.js`: the list of photos shown in the gallery.
- `photos/`: the image files.
- `style.css`: colors and layout. Colors are at the top.
- `script.js`: builds the gallery and the full-screen viewer. You shouldn't need to touch it.

## Add a photo

1. Export a JPG about 2000px on the long side and put it in `photos/`.
2. Add a line to `photos.js` with its file name, title and category.

New categories get a filter button automatically.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and go to http://localhost:8000.

## Publish on GitHub Pages

1. Put these files in a GitHub repository (for a site at `peilin-d.github.io`, name the repo `Peilin-D.github.io`).
2. In the repo, go to Settings → Pages and choose "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Optional: add a custom domain on the same page.
