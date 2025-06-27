import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns' // 新增的程式碼

// Define a TS type for the data we'll be using
export interface Post {
  id: string
  title: string
  content: string
  user: string 
  date?: string // Optional, as it may not be provided in all cases
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '0', date: sub(new Date(), { minutes: 10 }).toISOString() },
  { id: '2', title: 'Second Post', content: 'More text', user: '1', date: sub(new Date(), { minutes: 5 }).toISOString() }, 
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
          payload: { id: nanoid(), title, content, user: userId, date: new Date().toISOString(), }
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
    }
  }
})

export const { postAdded, postUpdated } = postsSlice.actions;

// Export the generated reducer function
export default postsSlice.reducer