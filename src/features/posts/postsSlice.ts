import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns' // 新增的程式碼

// Define a TS type for the data we'll be using

export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export type ReactionName = keyof Reactions
export interface Post {
  id: string
  title: string
  content: string
  user: string 
  date?: string // Optional, as it may not be provided in all cases
  reactions: Reactions
}
export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}


type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
}

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '0', date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: initialReactions },
  { id: '2', title: 'Second Post', content: 'More text', user: '1', date: sub(new Date(), { minutes: 5 }).toISOString(), reactions: initialReactions },
]

// Create the slice and pass in the initial state
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded:{
      reducer(state:Post[], action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: { id: nanoid(), title, content, user: userId, date: new Date().toISOString(), reactions: initialReactions }
        }
      }
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) { 
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: ReactionName }>
    ) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

// Export the generated reducer function
export default postsSlice.reducer