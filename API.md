BASE_URL="api.consumet.org"
using -> meta/anilist and meta/mal

# Search Route

### URL -> https://api.consumet.org/meta/anilist/{query}?page={page}

- query -> Required
- page -> Optional (Default: 1)

Query ->

```js
import axios from "axios";

// Using the example query "demon", and looking at the first page of results.
const url = "https://api.consumet.org/meta/anilist/demon";
const data = async () => {
  try {
    const { data } = await axios.get(url, { params: { page: 1 } });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

console.log(data);
```

Res ->

```json
{
  "currentPage": 1,
  "results": [
    {
      "id": "string",
      "title": "string",
      "image": "string",
      "type": "string",
      "rating": "number",
      "releaseDate": "string"
    }
  ]
}
```
