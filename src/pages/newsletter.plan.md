
## Feature 1

Make the default view of the page show options for several "newsletters" you can pick from

Data:
```javascript
const newsletters = [
  {
    id: "Won0dtG",
    title: "Rimu Newsletter Term 2 2025"
    year: 2025
    term: 2
    syndicate: "Rimu"
  },
  {
    id: "zU7DGlI",
    title: "Kōwhai Term 2 Newsletter 2025"
    year: 2025
    term: 2
    syndicate: "Kōwhai"
  },
  {
    id: "Lt7euHu",
    title: "Pōhutukawa Newsletter Term 2 2025"
    year: 2025
    term: 2
    syndicate: "Pōhutukawa"
  }
]
```

You should see buttons for each of these options on the page
When you click on one, it should take you to `/newsletters?id=<id>` and you should no longer see the
newsletter options, and it should use the `fetch` command to grab the data for the newsletter and display it
