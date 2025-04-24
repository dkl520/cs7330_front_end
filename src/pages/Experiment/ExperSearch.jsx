import { useState, useEffect } from 'react';

import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';

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
    BarChart as BarChartIcon,
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
    DataObject as DataObjectIcon,
    LocationOn as LocationOnIcon,
    // AccessTime as TimeIcon,
    Send as SendIcon,
    Repeat as RepeatIcon,
    AccessTime as AccessTimeIcon
} from '@mui/icons-material';



// Post Search Component
const ExperSearch = () => {
    // State management
    const [searchData, setSearchData] = useState({
        name: '',
    });

    const [showFilters, setShowFilters] = useState(false);
    const [posts, setPosts] = useState([]);
    const [percentages, setPercentages] = useState([]);
    const [loading, setLoading] = useState(false);

    const theme = useTheme();

    useEffect(() => {
    }, []);

    const handleFilterChange = (field, value) => {
        setSearchData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSearch = async () => {
        setShowFilters(false)
        try {
            const response = await window.$api.search.experSearch(searchData);
            setPosts(response.posts);
            setPercentages(response.percentages);
        } catch (error) {
            console.error('Failed to fetch field list:', error);
        } finally {
        }
    };

    const handleClear = () => {
        setSearchData({
            name: '',
        });
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    const getActiveFilterCount = () => {
        return Object.values(searchData).filter(val =>
            val !== '' && val !== null && val !== undefined
        ).length;
    };
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
                <Typography variant="h4">Experiment Search</Typography>

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

                                <TextField
                                    sx={{ width: '100%' }}
                                    size="small"
                                    label="ExperimentName"
                                    value={searchData.name}
                                    onChange={(e) => handleFilterChange('name', e.target.value)}
                                />

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
                <Box sx={{ display: 'flex', gap: 3 }}>
                    {/* Left side - Analysis Results */}
                    <Box sx={{ width: '30%', minWidth: '300px', height: '80vh', 
                    maxHeight: '80vh',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: alpha(theme.palette.success.light, 0.1),
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: alpha(theme.palette.success.light, 0.6),
                        borderRadius: '4px',
                        '&:hover': {
                            background: alpha(theme.palette.success.light, 0.8),
                        }
                    }      
                    }}>
                        {percentages && Object.keys(percentages).length > 0 && (
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    borderRadius: 3,
                                    background: `linear-gradient(145deg, ${alpha(theme.palette.success.light, 0.05)}, ${alpha(theme.palette.success.light, 0.15)})`,
                                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                                    boxShadow: `0 8px 16px -8px ${alpha(theme.palette.success.dark, 0.1)}`,
                                    overflow: 'auto'
                                }}
                            >
                                <Typography variant="h6" color="success.dark" gutterBottom fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <BarChartIcon /> Analysis Results
                                </Typography>
                                <Stack spacing={2} sx={{ mt: 1 }}>
                                    {Object.entries(percentages).map(([field, percentage]) => (
                                        <Box
                                            key={field}
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                bgcolor: alpha(theme.palette.background.paper, 0.7),
                                                border: `1px solid ${alpha(theme.palette.grey[300], 0.8)}`,
                                            }}
                                        >
                                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                {field}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={percentage}
                                                        sx={{
                                                            height: 8,
                                                            borderRadius: 1,
                                                            bgcolor: alpha(theme.palette.success.main, 0.1),
                                                            '& .MuiLinearProgress-bar': {
                                                                bgcolor: theme.palette.success.main
                                                            }
                                                        }}
                                                    />
                                                </Box>
                                                <Typography variant="body2" fontWeight={600} color="success.dark">
                                                    {percentage}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        )}
                    </Box>

                    {/* Right side - Posts */}
                    <Box sx={{ flex: 1, overflow: 'auto', height: '80vh' }}>
                        <Paper
                            elevation={3}
                            sx={{ borderRadius: 3, overflow: 'auto', height: '80vh', maxHeight: '80vh' }}
                        >
                            <Stack spacing={3} sx={{ p: 3 }}>
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
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: 600,
                                                                color: theme.palette.text.primary,
                                                                fontSize: { xs: '1rem', sm: '1.1rem' }
                                                            }}
                                                        >
                                                            {post.username || 'Anonymous User'}
                                                        </Typography>

                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Chip
                                                                size="small"
                                                                icon={<ThumbUpIcon fontSize="small" color='success.main' />}
                                                                label={post.likes}
                                                                sx={{
                                                                    bgcolor: alpha(theme.palette.success.main, 0.05),
                                                                    color: theme.palette.success.dark,
                                                                    fontWeight: 600,
                                                                    border: `1px solid ${alpha(theme.palette.success.main, 0.15)}`
                                                                }}
                                                            />
                                                            <Chip
                                                                size="small"
                                                                icon={<ThumbDownIcon fontSize="small" color='error.main' />}
                                                                label={post.dislikes}
                                                                sx={{
                                                                    bgcolor: alpha(theme.palette.error.main, 0.05),
                                                                    color: theme.palette.error.dark,
                                                                    fontWeight: 600,
                                                                    border: `1px solid ${alpha(theme.palette.error.main, 0.15)}`
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>

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

                                                    {/* Field-Value Display */}
                                                    {post.field && post.field.length > 0 && (
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
                                                                <DataObjectIcon fontSize="small" sx={{ color: theme.palette.info.main }} />
                                                                Attributes
                                                            </Typography>
                                                            <Grid container spacing={1}>
                                                                {post.field.map((field, index) => (
                                                                    <Grid item xs={6} sm={4} md={3} key={index}>
                                                                        <Paper
                                                                            elevation={0}
                                                                            sx={{
                                                                                p: 1,
                                                                                borderRadius: 2,
                                                                                bgcolor: alpha(theme.palette.info.main, 0.05),
                                                                                border: `1px solid ${alpha(theme.palette.info.main, 0.15)}`,
                                                                                display: 'flex',
                                                                                flexDirection: 'column'
                                                                            }}
                                                                        >
                                                                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                                                {field}
                                                                            </Typography>
                                                                            <Typography variant="body2" color="info.dark" fontWeight={600}>
                                                                                {post.value?.[index] || 'N/A'}
                                                                            </Typography>
                                                                        </Paper>
                                                                    </Grid>
                                                                ))}
                                                            </Grid>
                                                        </Box>
                                                    )}

                                                    {/* Location Info */}
                                                    {(post.city || post.state || post.country) && (
                                                        <Box
                                                            sx={{
                                                                mb: 2.5,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 1,
                                                                px: 1
                                                            }}
                                                        >
                                                            <LocationOnIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {[post.city, post.state, post.country].filter(Boolean).join(', ')}
                                                            </Typography>
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

                                                        {post.has_multimedia && (
                                                            <Chip
                                                                icon={<ImageIcon fontSize="small" />}
                                                                label="Has Media"
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: alpha(theme.palette.warning.main, 0.05),
                                                                    color: theme.palette.warning.dark,
                                                                    fontWeight: 500,
                                                                    border: `1px solid ${alpha(theme.palette.warning.main, 0.15)}`,
                                                                    '&:hover': {
                                                                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                                                                    },
                                                                    '& .MuiChip-icon': {
                                                                        color: alpha(theme.palette.warning.main, 0.8)
                                                                    }
                                                                }}
                                                            />
                                                        )}
                                                    </Stack>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        </Paper>
                    </Box>
                </Box>

            )}

        </Container>
    );
};

export default ExperSearch;