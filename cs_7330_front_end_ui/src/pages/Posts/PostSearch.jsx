import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    Container, Box, Typography, Paper, TextField, MenuItem,
    Button, Stack, FormControl, InputLabel, Select, Badge,
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, TablePagination, Chip,
    Collapse, IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

// 帖子详情对话框
const PostDetailDialog = ({ post, open, onClose }) => {
    if (!post) return null;
    
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">帖子详情</Typography>
                    <Chip label={post.platform} color="primary" />
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body1">
                        {post.content}
                    </Typography>
                </Paper>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        发布信息
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <Typography variant="body2">
                            平台：{post.platform}
                        </Typography>
                        <Typography variant="body2">
                            作者：{post.author}
                        </Typography>
                        <Typography variant="body2">
                            时间：{post.postTime}
                        </Typography>
                    </Stack>
                </Box>
                {post.projects.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                            相关项目
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                            {post.projects.map((project, index) => (
                                <Chip
                                    key={index}
                                    label={project}
                                    variant="outlined"
                                />
                            ))}
                        </Stack>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>关闭</Button>
            </DialogActions>
        </Dialog>
    );
};

// 帖子查询组件
const PostSearch = () => {
    // 状态管理
    const [filters, setFilters] = useState({
        platform: '',
        username: '',
        authorName: '',
        keyword: '',
        startDate: null,
        endDate: null,
    });
    
    const [showFilters, setShowFilters] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedPost, setSelectedPost] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    
    // 模拟数据
    const mockResults = [
        {
            id: 1,
            content: '这是一个示例帖子内容，内容很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长...',
            author: 'JohnDoe',
            platform: 'Twitter',
            postTime: '2024-03-15 14:30',
            projects: ['AI研究项目', '数据分析项目']
        },
        {
            id: 2,
            content: '另一个帖子的内容示例，这里展示的是一些普通的内容，没有特别的格式和要求。',
            author: 'JaneSmith',
            platform: 'Facebook',
            postTime: '2024-03-14 10:15',
            projects: ['社交媒体趋势', '用户行为分析', '内容策略研究']
        },
        {
            id: 3,
            content: '第三篇帖子，我们要分析一下不同长度内容的显示效果。',
            author: 'BobJohnson',
            platform: 'Instagram',
            postTime: '2024-03-13 09:45',
            projects: ['短内容影响力研究']
        }
    ];
    
    // 处理函数
    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    const handleSearch = () => {
        // 实际应用中这里会调用API
        setSearchResults(mockResults);
        setPage(0);
    };
    
    const handleClear = () => {
        setFilters({
            platform: '',
            username: '',
            authorName: '',
            keyword: '',
            startDate: null,
            endDate: null,
        });
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const handleViewPost = (post) => {
        setSelectedPost(post);
        setDialogOpen(true);
    };
    
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    
    // 计算筛选条件数量（用于badge显示）
    const getActiveFilterCount = () => {
        return Object.values(filters).filter(val => 
            val !== '' && val !== null && val !== undefined
        ).length;
    };
    
    const activeFilterCount = getActiveFilterCount();
    
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">帖子查询</Typography>
                
                <Button
                    variant="outlined"
                    startIcon={
                        <Badge badgeContent={activeFilterCount} color="primary">
                            <FilterListIcon />
                        </Badge>
                    }
                    onClick={toggleFilters}
                >
                    {showFilters ? '收起筛选' : '展开筛选'}
                </Button>
            </Box>
            
            {/* 筛选面板 - 使用绝对定位 */}
            <Box sx={{ 
                position: 'relative', 
                zIndex: 10,
                mb: 2,
                width: '100%'
            }}>
                <Collapse in={showFilters}>
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            p: 3, 
                            position: 'absolute',
                            width: '100%',
                            backgroundColor: 'white'
                        }}
                    >
                        <Stack spacing={3}>
                            <Typography variant="h6">搜索条件</Typography>
                            
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                <FormControl sx={{ width: '220px' }} size="small">
                                    <InputLabel>社交媒体平台</InputLabel>
                                    <Select
                                        value={filters.platform}
                                        label="社交媒体平台"
                                        onChange={(e) => handleFilterChange('platform', e.target.value)}
                                    >
                                        <MenuItem value="">不限</MenuItem>
                                        {['Twitter', 'Facebook', 'Instagram'].map(platform => (
                                            <MenuItem key={platform} value={platform}>
                                                {platform}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                
                                <TextField
                                    sx={{ width: '220px' }}
                                    size="small"
                                    label="用户名"
                                    value={filters.username}
                                    onChange={(e) => handleFilterChange('username', e.target.value)}
                                />
                                
                                <TextField
                                    sx={{ width: '220px' }}
                                    size="small"
                                    label="作者姓名"
                                    value={filters.authorName}
                                    onChange={(e) => handleFilterChange('authorName', e.target.value)}
                                />
                                
                                <TextField
                                    sx={{ width: '220px' }}
                                    size="small"
                                    label="关键词"
                                    value={filters.keyword || ''}
                                    onChange={(e) => handleFilterChange('keyword', e.target.value)}
                                    placeholder="搜索帖子内容"
                                />
                                
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="开始日期"
                                        value={filters.startDate}
                                        onChange={(date) => handleFilterChange('startDate', date)}
                                        slotProps={{ 
                                            textField: { 
                                                sx: { width: '220px' },
                                                size: "small"
                                            } 
                                        }}
                                    />
                                </LocalizationProvider>
                                
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="结束日期"
                                        value={filters.endDate}
                                        onChange={(date) => handleFilterChange('endDate', date)}
                                        slotProps={{ 
                                            textField: { 
                                                sx: { width: '220px' },
                                                size: "small"
                                            } 
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>
                            
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                    startIcon={<ClearIcon />}
                                    onClick={handleClear}
                                >
                                    清除
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<SearchIcon />}
                                    onClick={handleSearch}
                                >
                                    搜索
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Collapse>
            </Box>
            
          
            
            {/* 表格区域 */}
            <TableContainer component={Paper}>
                <Table aria-label="posts table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>内容预览</TableCell>
                            <TableCell>平台</TableCell>
                            <TableCell>作者</TableCell>
                            <TableCell>发布时间</TableCell>
                            <TableCell>相关项目</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((post) => (
                                <TableRow key={post.id} hover>
                                    <TableCell padding="checkbox">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleViewPost(post)}
                                        >
                                            <KeyboardArrowDownIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{post.content.substring(0, 50)}...</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={post.platform}
                                            color="primary"
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{post.author}</TableCell>
                                    <TableCell>{post.postTime}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            {post.projects.slice(0, 2).map((project, index) => (
                                                <Chip
                                                    key={index}
                                                    label={project}
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            ))}
                                            {post.projects.length > 2 && (
                                                <Chip 
                                                    label={`+${post.projects.length - 2}`} 
                                                    size="small" 
                                                    variant="outlined"
                                                />
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={searchResults.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="每页行数"
                />
            </TableContainer>
            
            <PostDetailDialog 
                post={selectedPost}
                open={dialogOpen}
                onClose={handleCloseDialog}
            />
        </Container>
    );
};

export default PostSearch;