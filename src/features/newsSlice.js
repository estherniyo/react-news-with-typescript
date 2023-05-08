import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "51c2b05805f84a918235842524492417";

const initialArticlesState = {
  articles: [],
  status: "idle",
  error: null,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (publisher) => {
    try {
      const response = await fetch(
        `https://news-proxy.netlify.app/api/everything${
          publisher
            ? `?sources=${publisher.id}&apiKey=${API_KEY}`
            : `?sources=abc-news&apiKey=${API_KEY}`
        }`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      return data.articles;
    } catch (error) {
      throw error;
    }
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState: initialArticlesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        // slice the news list to pick only 15
        state.articles = action.payload.slice(0, 15);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = articlesSlice.actions;

// This selector now gets the entire articles array from state and uses `.filter` to return only articles with matching publisher.
export const selectArticlesByPublisher = (state) => state?.articles.articles;
