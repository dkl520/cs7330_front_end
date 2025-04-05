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
import { 
  Search as SearchIcon,
  AccountTree as ProjectIcon,
  Group as GroupIcon 
} from '@mui/icons-material';
function App() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <Box sx={{ pb: 7 }}>  {/* 添加底部padding，为导航栏留出空间 */}
      <Routes>
        <Route path="/institutes" element={<InstituteList />} />
        <Route path="/institutes/:id" element={<InstituteDetail />} />
        <Route path="/institutes/detail" element={<InstituteDetail />} />
        <Route path="/institutes/create" element={<InstituteForm mode="create" />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/postsearch" element={<PostSearch />} />
        <Route path="/projectsearch" element={<ProjectSearch />} />
        {/* <Route path="/" element={<PostSearch />} /> */}
        <Route path="/projectposts" element={<ProjectPosts />} />
        <Route path="/" element={<ProjectPosts />} />
        <Route path="/institutes/edit/:id" element={<InstituteForm mode="edit" />} />
        <Route path="/navbar" element={<NavBar />} />
      </Routes>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          // 根据选中的值进行导航
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
              // navigate('/posts');
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
          borderColor: 'divider'
        }}
      >
      <BottomNavigationAction label="Post Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Project Search" icon={<ProjectIcon />} />
        <BottomNavigationAction label="Institutes" icon={<SchoolIcon />} />
        <BottomNavigationAction label="Users" icon={<GroupIcon />} />
        {/* <BottomNavigationAction label="文章" icon={<ArticleIcon />} /> */}
      </BottomNavigation>
    </Box>
  );
}

export default App;