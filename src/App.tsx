import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { PostsMainPage } from './features/posts/PostsMainPage'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'

// 取得正確的 basename，開發環境為空，生產環境為 GitHub Pages 路徑
const basename = process.env.NODE_ENV === 'production' ? '/Redux-Offical-Example-APP_Social-Media-APP' : ''

function App() {
  return (
    <Router basename={basename}>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<PostsMainPage/>}/>
          <Route path="/posts/:postId" element={<SinglePostPage/>} />
          <Route path="/editPost/:postId" element={<EditPostForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
