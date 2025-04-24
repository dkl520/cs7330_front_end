import { useState, useEffect } from 'react';
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
    TableHead, TableRow, TablePagination, Chip, alpha,
    Card, CardContent, Avatar, CircularProgress, useTheme,
    Collapse, IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Image as ImageIcon,
    ThumbUp as LikeIcon,
    ThumbDown as DislikeIcon,
    LocationOn as LocationIcon,
    Science as ScienceIcon,
    SearchOff as SearchOffIcon,
    // AccessTime as TimeIcon,
    Send as SendIcon,
    Repeat as RepeatIcon,
    AccessTime as AccessTimeIcon
} from '@mui/icons-material';



// Post Search Component
const PostSearch = () => {
    // State management
    const [searchData, setSearchData] = useState({
        media_id: '',
        username: '',
        author: '',
        start_date: null,
        end_date: null,
    });

    const [showFilters, setShowFilters] = useState(false);
    const [] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mediaList, setMediaList] = useState([]);

    const theme = useTheme();
    // Mock data


    useEffect(() => {
        fetchSocialMedia();
    }, []);



    const fetchSocialMedia = async () => {
        try {
            const response = await window.$api.media.list();
            setMediaList(response);
        } catch (error) {
            console.error('Failed to fetch field list:', error);
            setMediaList([]);
        } finally {
        }

    }
    // Handler functions
    const handleFilterChange = (field, value) => {
        setSearchData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSearch = async () => {
        setShowFilters(false)
        try {
            const response = await window.$api.search.PostSearch(searchData);
            setPosts(response);
        } catch (error) {
            console.error('Failed to fetch field list:', error);
        } finally {
        }
    };

    const handleClear = () => {
        setSearchData({
            media_id: '',
            username: '',
            author: '',
            start_date: null,
            end_date: null,
        });
    };



    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Calculate active filter count (for badge display)
    const getActiveFilterCount = () => {
        return Object.values(searchData).filter(val =>
            val !== '' && val !== null && val !== undefined
        ).length;
    };

    // Example implementation of getRandomColor function
    const getRandomColor = (seed) => {
        const colors = [
            '#FF6B6B', // Red
            '#4ECDC4', // Teal
            '#FF9F1C', // Orange
            '#2A9D8F', // Green
            '#E76F51', // Coral
            '#6A4C93', // Purple
            '#1982C4', // Blue
            '#8AC926', // Lime
            '#FFCA3A', // Yellow
            '#6A0572', // Violet
            '#1B998B', // Sea Green
            '#FF595E', // Red-Orange
        ];
        // Generate a simple hash from the seed string
        let hash = 0;
        if (!seed) return colors[0];

        for (let i = 0; i < seed.length; i++) {
            hash = seed.charCodeAt(i) + ((hash << 5) - hash);
        }
        // Use the hash to select a color from the array
        const index = Math.abs(hash) % colors.length;
        return colors[index];
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
                                        value={searchData.media_id}
                                        label="Social Media Platform"
                                        onChange={(e) => handleFilterChange('media_id', e.target.value)}
                                    >
                                        <MenuItem value="">All</MenuItem>
                                        {mediaList.map(option => (
                                            <MenuItem key={option.media_id} value={option.media_id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    sx={{ width: '220px' }}
                                    size="small"
                                    label="Username"
                                    value={searchData.username}
                                    onChange={(e) => handleFilterChange('username', e.target.value)}
                                />

                                <TextField
                                    sx={{ width: '220px' }}
                                    size="small"
                                    label="Author Name"
                                    value={searchData.author}
                                    onChange={(e) => handleFilterChange('author', e.target.value)}
                                />


                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        value={searchData.start_date}
                                        onChange={(date) => handleFilterChange('start_date', date)}
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
                                        value={searchData.end_date}
                                        onChange={(date) => handleFilterChange('end_date', date)}
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
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
                    <CircularProgress size={40} thickness={4} color="primary" />
                </Box>
            ) : posts.length === 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        borderRadius: 3,
                        textAlign: 'center',
                        background: `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.primary.light, 0.15)})`,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        boxShadow: `0 8px 16px -8px ${alpha(theme.palette.primary.dark, 0.1)}`
                    }}
                >
                    <Box sx={{ mb: 2 }}>
                        <SearchOffIcon sx={{ fontSize: 48, color: alpha(theme.palette.primary.main, 0.6), mb: 1 }} />
                    </Box>
                    <Typography variant="h5" color="primary.dark" gutterBottom fontWeight={600}>
                        No Posts Available
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Please search for posts to get started
                    </Typography>
                </Paper>
            ) : (
                <Paper
                    elevation={3}
                    sx={{ borderRadius: 3, overflow:'auto',  maxHeight: '72vh' }}
                >
                    <Stack spacing={3}>
                        {posts.map((post,i) => (
                            <Card
                                key={i}
                                elevation={0}
                                sx={{
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    transition: 'all 0.3s',
                                    border: `1px solid ${alpha(theme.palette.grey[300], 0.8)}`,
                                    background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${alpha(theme.palette.grey[50], 0.7)})`,
                                    boxShadow: `0 10px 20px -10px ${alpha(theme.palette.grey[700], 0.1)}`,
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: `0 14px 28px -12px ${alpha(theme.palette.grey[700], 0.15)}`,
                                        borderColor: alpha(theme.palette.primary.main, 0.3)
                                    }
                                }}
                            >
                                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                    <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 } }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: getRandomColor(post.username),
                                                width: { xs: 42, sm: 48 },
                                                height: { xs: 42, sm: 48 },
                                                fontSize: { xs: '1.2rem', sm: '1.4rem' },
                                                fontWeight: 600,
                                                boxShadow: `0 4px 8px ${alpha(theme.palette.grey[700], 0.15)}`
                                            }}
                                        >
                                            {post.username?.toString().charAt(0) || 'U'}
                                        </Avatar>

                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    mb: 0.5,
                                                    color: theme.palette.text.primary,
                                                    fontSize: { xs: '1rem', sm: '1.1rem' }
                                                }}
                                            >
                                                {post.username || 'Anonymous User'}
                                            </Typography>

                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    mb: 2.5,
                                                    whiteSpace: 'pre-line',
                                                    color: theme.palette.text.primary,
                                                    lineHeight: 1.6
                                                }}
                                            >
                                                {post.content}
                                            </Typography>

                                            {/* Experiments List Display */}
                                            {post.experiments && post.experiments.length > 0 && (
                                                <Box
                                                    sx={{
                                                        mb: 2.5,
                                                        p: 1.5,
                                                        borderRadius: 2,
                                                        background: alpha(theme.palette.background.default, 0.6),
                                                        border: `1px solid ${alpha(theme.palette.grey[300], 0.8)}`,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            mb: 1,
                                                            color: theme.palette.text.secondary,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 0.5,
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        <ScienceIcon fontSize="small" sx={{ color: theme.palette.info.main }} />
                                                        Experiments
                                                    </Typography>
                                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                                        {post.experiments.map((experiment, index) => (
                                                            <Chip
                                                                key={index}
                                                                label={experiment}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: alpha(theme.palette.info.main, 0.05),
                                                                    color: theme.palette.info.dark,
                                                                    fontWeight: 500,
                                                                    '&:hover': {
                                                                        bgcolor: alpha(theme.palette.info.main, 0.1),
                                                                    },
                                                                    border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                                                                    boxShadow: `0 2px 4px ${alpha(theme.palette.info.main, 0.05)}`,
                                                                    mb: 0.5
                                                                }}
                                                            />
                                                        ))}
                                                    </Stack>
                                                </Box>
                                            )}

                                            <Stack
                                                direction="row"
                                                spacing={1.5}
                                                alignItems="center"
                                                flexWrap="wrap"
                                                sx={{
                                                    pt: 0.5,
                                                    borderTop: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                                                    px: 0.5
                                                }}
                                            >
                                                <Chip
                                                    icon={<PersonIcon fontSize="small" />}
                                                    label={post.media || 'Unknown Source'}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                                                        color: theme.palette.primary.dark,
                                                        fontWeight: 500,
                                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                                                        '&:hover': {
                                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                        },
                                                        '& .MuiChip-icon': {
                                                            color: alpha(theme.palette.primary.main, 0.8)
                                                        }
                                                    }}
                                                />

                                                <Chip
                                                    icon={<AccessTimeIcon fontSize="small" />}
                                                    label={post.time || 'Unknown Time'}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: alpha(theme.palette.secondary.main, 0.05),
                                                        color: theme.palette.secondary.dark,
                                                        fontWeight: 500,
                                                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.15)}`,
                                                        '&:hover': {
                                                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                                        },
                                                        '& .MuiChip-icon': {
                                                            color: alpha(theme.palette.secondary.main, 0.8)
                                                        }
                                                    }}
                                                />
                                            </Stack>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </Paper>
            )}

            {/* Add the getRandomColor function if it's not already defined elsewhere */}
            {/* 

*/}



        </Container>
    );
};

export default PostSearch;