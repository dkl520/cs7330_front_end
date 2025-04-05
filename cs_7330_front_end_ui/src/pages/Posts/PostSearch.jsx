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

// Post Detail Dialog
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
                    <Typography variant="h6">Post Details</Typography>
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
                        Post Information
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <Typography variant="body2">
                            Platform: {post.platform}
                        </Typography>
                        <Typography variant="body2">
                            Author: {post.author}
                        </Typography>
                        <Typography variant="body2">
                            Time: {post.postTime}
                        </Typography>
                    </Stack>
                </Box>
                {post.projects.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Related Projects
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
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

// Post Search Component
const PostSearch = () => {
    // State management
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
    
    // Mock data
    const mockResults = [
        {
            id: 1,
            content: 'This is an example post content, very long very long very long very long very long very long very long very long very long very long...',
            author: 'JohnDoe',
            platform: 'Twitter',
            postTime: '2024-03-15 14:30',
            projects: ['AI Research Project', 'Data Analysis Project']
        },
        {
            id: 2,
            content: 'Another example post content, showing some regular content without special formatting or requirements.',
            author: 'JaneSmith',
            platform: 'Facebook',
            postTime: '2024-03-14 10:15',
            projects: ['Social Media Trends', 'User Behavior Analysis', 'Content Strategy Research']
        },
        {
            id: 3,
            content: 'Third post, we need to analyze the display effect of content with different lengths.',
            author: 'BobJohnson',
            platform: 'Instagram',
            postTime: '2024-03-13 09:45',
            projects: ['Short Content Impact Research']
        }
    ];
    
    // Handler functions
    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    const handleSearch = () => {
        // In actual application, this would call an API
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
    
    // Calculate active filter count (for badge display)
    const getActiveFilterCount = () => {
        return Object.values(filters).filter(val => 
            val !== '' && val !== null && val !== undefined
        ).length;
    };
    
    const activeFilterCount = getActiveFilterCount();
    
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Post Search</Typography>
                
                <Button
                    variant="outlined"
                    startIcon={
                        <Badge badgeContent={activeFilterCount} color="primary">
                            <FilterListIcon />
                        </Badge>
                    }
                    onClick={toggleFilters}
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
            </Box>
            
            {/* Filter Panel - using absolute positioning */}
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
                            <Typography variant="h6">Search Criteria</Typography>
                            
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                <FormControl sx={{ width: '220px' }} size="small">
                                    <InputLabel>Social Media Platform</InputLabel>
                                    <Select
                                        value={filters.platform}
                                        label="Social Media Platform"
                                        onChange={(e) => handleFilterChange('platform', e.target.value)}
                                    >
                                        <MenuItem value="">All</MenuItem>
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
                                    label="Username"
                                    value={filters.username}
                                    onChange={(e) => handleFilterChange('username', e.target.value)}
                                />
                                
                                <TextField
                                    sx={{ width: '220px' }}
                                    size="small"
                                    label="Author Name"
                                    value={filters.authorName}
                                    onChange={(e) => handleFilterChange('authorName', e.target.value)}
                                />
                                
                                <TextField
                                    sx={{ width: '220px' }}
                                    size="small"
                                    label="Keyword"
                                    value={filters.keyword || ''}
                                    onChange={(e) => handleFilterChange('keyword', e.target.value)}
                                    placeholder="Search post content"
                                />
                                
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
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
                                        label="End Date"
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
                                    Clear
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<SearchIcon />}
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Collapse>
            </Box>
            
            {/* Table Area */}
            <TableContainer component={Paper}>
                <Table aria-label="posts table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Content Preview</TableCell>
                            <TableCell>Platform</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Post Time</TableCell>
                            <TableCell>Related Projects</TableCell>
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
                    labelRowsPerPage="Rows per page"
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