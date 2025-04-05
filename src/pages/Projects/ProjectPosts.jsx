import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container, Box, Typography, Button, Paper, Grid,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Card, CardContent, CardActions, IconButton,
    Checkbox, Chip, Stack, Pagination, InputAdornment
} from '@mui/material';
import {
    Search as SearchIcon,
    Delete as DeleteIcon,
    Add as AddIcon
} from '@mui/icons-material';

const ProjectPosts = () => {
    const { projectId } = useParams();
    const [page, setPage] = useState(1);
    const [searchPage, setSearchPage] = useState(1);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const [projectPosts] = useState([

        {
            id: 3,
            content: "Third sample post content... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            platform: "Instagram",
            author: "User C",
            postTime: "2024-01-17"
        },
        {
            id: 3,
            content: "Third sample post content... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            platform: "Instagram",
            author: "User C",
            postTime: "2024-01-17"
        },
        {
            id: 3,
            content: "Third sample post content... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            platform: "Instagram",
            author: "User C",
            postTime: "2024-01-17"
        },
        {
            id: 3,
            content: "Third sample post content... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            platform: "Instagram",
            author: "User C",
            postTime: "2024-01-17"
        },
        {
            id: 3,
            content: "Third sample post content... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            platform: "Instagram",
            author: "User C",
            postTime: "2024-01-17"
        },
        {
            id: 3,
            content: "Third sample post content... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            platform: "Instagram",
            author: "User C",
            postTime: "2024-01-17"
        },
        {
            id: 4,
            content: "Fourth sample post content... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            platform: "LinkedIn",
            author: "User D",
            postTime: "2024-01-18"
        }
    ]);

    const [searchResults] = useState([
        {
            id: 5,
            content: "Search result post... Lorem ipsum dolor sit amet.",
            platform: "Twitter",
            author: "User E",
            postTime: "2024-01-19"
        },
        {
            id: 6,
            content: "Another search result... Lorem ipsum dolor sit amet.",
            platform: "Instagram",
            author: "User F",
            postTime: "2024-01-20"
        }
    ]);

    const handleRemovePost = (postId) => {
        setPostToDelete(postId);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        setDeleteConfirmOpen(false);
        setPostToDelete(null);
    };

    const handleSearch = () => {
        setSearchPage(1);
    };

    const handleAddPosts = () => {
        setAddDialogOpen(false);
        setSelectedPosts([]);
    };

    const PostCard = ({ post, isSearchResult = false }) => (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {isSearchResult && (
                    <Box sx={{ mb: 2 }}>
                        <Checkbox
                            checked={selectedPosts.includes(post.id)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedPosts([...selectedPosts, post.id]);
                                } else {
                                    setSelectedPosts(selectedPosts.filter(id => id !== post.id));
                                }
                            }}
                        />
                    </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip
                        label={post.platform}
                        color="primary"
                        size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                        {post.postTime}
                    </Typography>
                </Box>
                <Typography variant="subtitle2" gutterBottom>
                    {post.author}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {post.content}
                </Typography>
            </CardContent>
            {!isSearchResult && (
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemovePost(post.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            )}
        </Card>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Project Related Posts</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setAddDialogOpen(true)}
                >
                    Add Posts
                </Button>
            </Box>

            <Box sx={{
                height: 'calc(100vh - 250px)', // Set fixed height minus the top and bottom space
                overflow: 'auto',  // Add scrollbar
                '&::-webkit-scrollbar': {  // Custom scrollbar styles
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555',
                },
            }}>
                <Grid container spacing={2}>
                    {projectPosts.map((post) => (
                        <Grid item xs={12} sm={6} md={6} lg={6} key={post.id}>
                            <PostCard post={post} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    count={10}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                />
            </Box>

            <Dialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Add Related Posts</DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 3, mt: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Search post content..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>

                    <Grid container spacing={2}>
                        {searchResults.map((post) => (
                            <Grid item xs={12} sm={6} md={6} lg={6} key={post.id}>
                                <PostCard post={post} isSearchResult={true} />
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination
                            count={10}
                            page={searchPage}
                            onChange={(e, value) => setSearchPage(value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleAddPosts}
                        disabled={selectedPosts.length === 0}
                    >
                        Add Selected
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to remove this post from the project? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={confirmDelete}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProjectPosts;
