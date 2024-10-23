# Needle Technical Test

Tech Stack: NextJS, TypeScript, TailWindCSS, Firebase Ecosystem

## To run locally

0. Clone git repository
1. Create and ensure `.env.local` file is filled out with the backend url. See `.env.sample` (Api key and other details are in `apphosting.yaml`)
2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

## Firestore Data Structure & Security

### Firestore Document Example

![Firestore Document](https://github.com/user-attachments/assets/5e70ac0c-822e-4fbe-9504-18e9366a28f5)

**Structure:**

- **Collection**: `users`
  - **Fields**:
    - `createdAt`: Timestamp of document creation.
    - `email`: User's email.
    - `favouriteBreeds`: Array of favorite dog breeds.
    - `likedPictures`: Array of image URLs from the `dog.ceo` API.
    - `uid`: User's unique ID.

**Security:**

To ensure security, authentication-based rules can be used. For example:

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

This ensures that only authenticated users can access their own documents, preventing unauthorized access.

## Firebase Function Refactoring

[Link to Firebase cloud functions repository](https://github.com/afyqzarof/needlee-firebase-cloud-fucntions)

To integrate the Dog CEO API and flatten the breeds into a single array of strings:

### Reasons:

- **API Rate Limits**: Minimize requests to avoid hitting limits.
- **Error Handling**: Handle failures and retry logic.
- **Security**: Ensure only authenticated requests can trigger the function.
- **Data Caching**: Reduce unnecessary API calls by caching the response.

### Example Plan:

#### With using existing flattening funtion

```ts
const formatDogs = (dogBreeds: Record<string, string[]>) => {
  const breeds: string[] = [];

  for (const breed in dogBreeds) {
    if (dogBreeds[breed].length === 0) {
      breeds.push(breed);
    } else {
      for (const subBreed of dogBreeds[breed]) {
        breeds.push(`${subBreed} ${breed}`);
      }
    }
  }

  return breeds;
};
```

```ts
const fetchDogBreeds = functions.https.onCall(async (data, context) => {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
    const breeds = response.data.message;

    const formattedBreeds = formatDogs(breeds);

    return { breeds: flattenedBreeds };
  } catch (error) {
    throw new functions.https.HttpsError("Unable to fetch breeds");
  }
});

export { fetchDogBreeds };
```

## Unit Testing Approach

### Strategy:

- **Test Success & Failure Paths**: API success, failure, and correct flattening logic.
- **Use Jest**: Write unit tests for Node.js Firebase functions
- **Use mock data for query tests**

### Example Test:

```js
test("fetchDogBreeds flattens breeds correctly", async () => {
  axios.get = jest.fn().mockResolvedValue({
    data: {
      message: { australian: ["cattledog"], beagle: [], entlebucher: [] },
    },
  });

  const response = await fetchDogBreeds();
  expect(response.breeds).toEqual([
    "cattledog australian",
    "beagle",
    "entlebucher",
  ]);
});
```

## Improvements to be Made
- User is currently able to like the same image twice
- Liked count on image
  - This would require restructuring the database to support a many-to-many relationship with picture and user who likes

## Reflection and Final Thoughts
Coming to a fully relational database background it was an interesting and fun challenge to learn a non-relational database structure as I've heard a lot about it. From my brief experience, I now understand the hype for this technology and want to continue experimenting with it in the future.