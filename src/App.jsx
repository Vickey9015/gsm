import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Industries from './pages/Industries'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import { AuthProvider } from './context/AuthContext'
import { BlogProvider } from './context/BlogContext'
import AdminLayout from './admin/AdminLayout'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminBlogList from './admin/AdminBlogList'
import AdminBlogEditor from './admin/AdminBlogEditor'

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BlogProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="industries" element={<Industries />} />
                <Route path="contact" element={<Contact />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
              </Route>

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="blogs" element={<AdminBlogList />} />
                <Route path="blogs/new" element={<AdminBlogEditor />} />
                <Route path="blogs/:id" element={<AdminBlogEditor />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BlogProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}
