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
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';

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
        <Route path="/" element={<ProjectList />} />
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
              navigate('/projects');
              break;
            case 1:
              navigate('/institutes');
              break;
            case 2:
              navigate('/users');
              break;
            case 3:
              navigate('/posts');
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
        <BottomNavigationAction label="项目" icon={<HomeIcon />} />
        <BottomNavigationAction label="研究所" icon={<SchoolIcon />} />
        <BottomNavigationAction label="用户" icon={<GroupIcon />} />
        <BottomNavigationAction label="文章" icon={<ArticleIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default App;