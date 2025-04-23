import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState } from 'react';
import InstituteList from './pages/Institutes/InstituteList';
import InstituteDetail from './pages/Institutes/InstituteDetail';
import InstituteForm from './pages/Institutes/InstituteForm';
import UserList from './pages/Users/UserList';
import PostList from './pages/Posts/PostList';
import ProjectList from './pages/Projects/ProjectList';
import NavBar from './components/NavBar';
import SchoolIcon from '@mui/icons-material/School';
import PostSearch from './pages/Posts/PostSearch';
import ProjectSearch from './pages/Projects/ProjectSearch';
import ProjectPosts from './pages/Projects/ProjectPosts';
import MediaList from './pages/media/MediaList';
import {
  Search as SearchIcon,
  AccountTree as ProjectIcon,
  Group as GroupIcon,
  Devices as MediaIcon
} from '@mui/icons-material';
// ... existing code ...

function App() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* 渐变背景 */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />

      {/* 动态波浪效果 */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#4f46e510_25%,transparent_25%,transparent_75%,#4f46e510_75%,#4f46e510_100%)] bg-[length:60px_60px] animate-[gradient_3s_linear_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#4f46e510_25%,transparent_25%,transparent_75%,#4f46e510_75%,#4f46e510_100%)] bg-[length:60px_60px] animate-[gradient_3s_linear_infinite] rotate-45" />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 pb-16">
        <Routes>
          <Route path="/postsearch" element={<PostSearch />} />
          <Route path="/projectlist" element={<ProjectList />} />
          <Route path="/" element={<PostSearch />} />
          <Route path="/projectsearch" element={<ProjectSearch />} />
          <Route path="/institutes" element={<InstituteList />} />
          <Route path="/institutes/:id" element={<InstituteDetail />} />
          <Route path="/institutes/new" element={<InstituteForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id/posts" element={<ProjectPosts />} />
          <Route path="/medialist" element={<MediaList />} />
        </Routes>

        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            switch (newValue) {
              case 0:
                navigate('/postsearch');
                break;
              case 1:
                navigate('/projectsearch');
                break;
              case 2:
                navigate('/institutes');
                break;
              case 3:
                navigate('/users');
                break;
              case 4:
                navigate('/medialist');
                break;
              default:
                break;
            }
          }}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: 1,
            borderColor: 'divider',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <BottomNavigationAction label="Post Search" icon={<SearchIcon />} />
          <BottomNavigationAction label="Project Search" icon={<ProjectIcon />} />
          <BottomNavigationAction label="Institutes" icon={<SchoolIcon />} />
          <BottomNavigationAction label="Users" icon={<GroupIcon />} />
          <BottomNavigationAction label="Media" icon={<MediaIcon />} />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default App;