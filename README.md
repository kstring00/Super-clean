# Super Clean Washateria — concept site

Independent concept design for Super Clean Washateria, Stafford TX.
Not affiliated with the business. The site is `noindex, nofollow, noarchive`
and stays that way until the business formally engages.

## Changing the content

Everything a visitor reads — hours, address, phone, prices, amenities, service
copy — lives in **`content.json`**. That is the only file you need to touch for
a content change.

1. Open `content.json`.
2. Edit the value between the quotes. Leave the name on the left of the colon alone.
3. Save, then run `npm run build`.
4. Commit and push. Vercel rebuilds on push.

Keys beginning with `_` are notes for whoever is editing; they never appear on
the site.

### Facts we do not know yet

Several fields are `null` because nobody has confirmed the real value. **A
`null` field renders nothing** — the section it belongs to is skipped
entirely, so a visitor never sees a placeholder. Fill in a real value and it
appears on the next build.

Search `content.json` for `TODO_CONFIRM_WITH_OWNER` to see what is outstanding,
or just run `npm run build` — it prints the list.

Currently outstanding:

| Field | What to ask |
| --- | --- |
| `pricing.selfService` | Price per machine, by capacity |
| `pricing.washAndFold` | Per-pound rate |
| `washAndFold.turnaround` | Same day or next day |
| `washAndFold.dropOffCutoff` | Latest drop-off that still makes that turnaround |
| `lastWashTime` | How long before close the final load can start |
| `payment.methods` | A directory lists card payment — are coins still accepted? |
| `machineSizes` | Which capacities are on the floor |

The opening **hours are also unverified** — they came from a third-party
directory, not the owner. They are on the page because a laundromat site
without hours is worse than one with approximate hours, but confirm them and
set `hours.verified` to `true`.

## Building

```sh
npm run build     # writes dist/
```

No dependencies. `build.mjs` reads `content.json` and `src/styles.css`, renders
the page with `src/render.mjs`, and writes `dist/index.html` plus `dist/img/`.

## Deployment

Vercel, configured by `vercel.json`: build command `npm run build`, output
directory `dist`. `vercel.json` also sets the `X-Robots-Tag` response header.

## Layout

```
content.json      all business content — edit this
src/styles.css    stylesheet, inlined into the page at build time
src/render.mjs    markup, built from content.json
build.mjs         build entry point
assets/img/       source images, copied to dist/img/
dist/             build output (not committed)
```
