import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
    Container, Box, Typography, Paper, TextField,
    Button, Stack, FormControl, InputLabel, Select, MenuItem,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination, Chip,
    Badge
} from '@mui/material';

const ProjectSearch = () => {
    const [filters, setFilters] = useState({
        project_id: '',
        name: '',
        manager_first_name: '',
        manager_last_name: '',
        institute_id: '',
        start_date: null,
        end_date: null
    });

    const [showFilters, setShowFilters] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Mock data
    const mockResults = [
        {
            project_id: 1,
            name: "AI Research Project",
            manager_first_name: "Zhang",
            manager_last_name: "San",
            institute_id: 1,
            start_date: "2024-01-01",
            end_date: "2024-12-31"
        }
    ];

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSearch = () => {
        setSearchResults(mockResults);
        setPage(0);
    };

    const handleClear = () => {
        setFilters({
            project_id: '',
            name: '',
            manager_first_name: '',
            manager_last_name: '',
            institute_id: '',
            start_date: null,
            end_date: null
        });
    };

    const getActiveFilterCount = () => {
        return Object.values(filters).filter(val =>
            val !== '' && val !== null && val !== undefined
        ).length;
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Project Search</Typography>
                <Button
                    variant="outlined"
                    startIcon={
                        <Badge badgeContent={getActiveFilterCount()} color="primary">
                            <FilterListIcon />
                        </Badge>
                    }
                    onClick={() => setShowFilters(!showFilters)}
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

                <Paper elevation={3} sx={{
                    position: 'absolute',
                    // width: '100%',
                    backgroundColor: 'white',
                    zIndex: 1,
                    p: 3,
                    display: showFilters ? 'block' : 'none'

                }}>
                    <Stack spacing={3}>
                        <Typography variant="h6">Search Criteria</Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            <TextField
                                sx={{ width: '220px' }}
                                size="small"
                                label="Project ID"
                                type="number"
                                value={filters.project_id}
                                onChange={(e) => handleFilterChange('project_id', e.target.value)}
                            />

                            <TextField
                                sx={{ width: '220px' }}
                                size="small"
                                label="Project Name"
                                value={filters.name}
                                onChange={(e) => handleFilterChange('name', e.target.value)}
                            />

                            <TextField
                                sx={{ width: '220px' }}
                                size="small"
                                label="Manager First Name"
                                value={filters.manager_first_name}
                                onChange={(e) => handleFilterChange('manager_first_name', e.target.value)}
                            />

                            <TextField
                                sx={{ width: '220px' }}
                                size="small"
                                label="Manager Last Name"
                                value={filters.manager_last_name}
                                onChange={(e) => handleFilterChange('manager_last_name', e.target.value)}
                            />

                            <TextField
                                sx={{ width: '220px' }}
                                size="small"
                                label="Institute ID"
                                type="number"
                                value={filters.institute_id}
                                onChange={(e) => handleFilterChange('institute_id', e.target.value)}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Start Date"
                                    value={filters.start_date}
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
                                    value={filters.end_date}
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
            </Box>

            <TableContainer component={Paper}>
                <Table aria-label="projects table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Project ID</TableCell>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Project Manager</TableCell>
                            <TableCell>Institute ID</TableCell>
                            <TableCell>Duration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((project) => (
                                <TableRow key={project.project_id} hover>
                                    <TableCell>{project.project_id}</TableCell>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>
                                        {project.manager_first_name + project.manager_last_name}
                                    </TableCell>
                                    <TableCell>{project.institute_id}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={`${project.start_date} ~ ${project.end_date}`}
                                            size="small"
                                            variant="outlined"
                                        />
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
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                    labelRowsPerPage="Rows per page"
                />
            </TableContainer>
        </Container>
    );
};

export default ProjectSearch;