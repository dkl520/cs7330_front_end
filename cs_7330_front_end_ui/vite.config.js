import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  resolve: {
    // alias: {
    //   '@mui/styled-engine': path.resolve(__dirname, 'node_modules/@mui/styled-engine-sc'),
    // },
  },
  plugins: [
    react(),
    AutoImport({
      imports: [
        {
          '@mui/material': [
            // Layout 布局组件
            'Box', 'Container', 'Grid', 'Stack', 'ImageList', 'ImageListItem',
            'ImageListItemBar',

            // Navigation 导航组件
            'BottomNavigation', 'BottomNavigationAction', 'Breadcrumbs',
            'Drawer', 'Link', 'Menu', 'MenuItem', 'MenuList', 'Stepper',
            'Step', 'StepButton', 'StepContent', 'StepIcon', 'StepLabel',
            'Tabs', 'Tab',

            // Surfaces 表面组件
            'Accordion', 'AccordionActions', 'AccordionDetails', 'AccordionSummary',
            'AppBar', 'Card', 'CardActionArea', 'CardActions', 'CardContent',
            'CardHeader', 'CardMedia', 'Paper', 'Toolbar',

            // Feedback 反馈组件
            'Alert', 'AlertTitle', 'Backdrop', 'Dialog', 'DialogActions',
            'DialogContent', 'DialogContentText', 'DialogTitle', 'CircularProgress',
            'LinearProgress', 'Skeleton', 'Snackbar', 'Tooltip',

            // Data Display 数据展示
            'Avatar', 'AvatarGroup', 'Badge', 'Chip', 'Divider', 'List',
            'ListItem', 'ListItemAvatar', 'ListItemButton', 'ListItemIcon',
            'ListItemSecondaryAction', 'ListItemText', 'ListSubheader',
            'Table', 'TableBody', 'TableCell', 'TableContainer', 'TableFooter',
            'TableHead', 'TablePagination', 'TableRow', 'TableSortLabel',
            'Typography',

            // Inputs 输入组件
            'Autocomplete', 'Button', 'ButtonBase', 'ButtonGroup', 'Checkbox',
            'Fab', 'FormControl', 'FormControlLabel', 'FormGroup', 'FormHelperText',
            'FormLabel', 'IconButton', 'Input', 'InputAdornment', 'InputBase',
            'InputLabel', 'OutlinedInput', 'Radio', 'RadioGroup', 'Rating',
            'Select', 'Slider', 'Switch', 'TextField', 'ToggleButton',
            'ToggleButtonGroup',

            // Utils 工具组件
            'ClickAwayListener', 'Modal', 'NoSsr', 'Popover', 'Popper',
            'Portal', 'TextareaAutosize', 'useMediaQuery', 'useScrollTrigger',

            // Lab 实验性组件
            'LoadingButton', 'Pagination', 'SpeedDial', 'SpeedDialAction',
            'SpeedDialIcon', 'Timeline', 'TimelineConnector', 'TimelineContent',
            'TimelineDot', 'TimelineItem', 'TimelineOppositeContent',
            'TimelineSeparator', 'TreeItem', 'TreeView'
          ],
          '@mui/icons-material': [
            // 常用图标
            ['Add', 'AddIcon'], ['AddCircle', 'AddCircleIcon'],
            ['ArrowBack', 'ArrowBackIcon'], ['ArrowForward', 'ArrowForwardIcon'],
            ['Check', 'CheckIcon'], ['Clear', 'ClearIcon'],
            ['Close', 'CloseIcon'], ['Delete', 'DeleteIcon'],
            ['Edit', 'EditIcon'], ['Error', 'ErrorIcon'],
            ['Favorite', 'FavoriteIcon'], ['Help', 'HelpIcon'],
            ['Home', 'HomeIcon'], ['Info', 'InfoIcon'],
            ['KeyboardArrowDown', 'KeyboardArrowDownIcon'],
            ['KeyboardArrowUp', 'KeyboardArrowUpIcon'],
            ['Menu', 'MenuIcon'], ['MoreVert', 'MoreVertIcon'],
            ['Notifications', 'NotificationsIcon'],
            ['Person', 'PersonIcon'], ['Search', 'SearchIcon'],
            ['Settings', 'SettingsIcon'], ['Star', 'StarIcon'],
            ['Warning', 'WarningIcon'],

            // 文件相关
            ['CloudUpload', 'CloudUploadIcon'],
            ['CloudDownload', 'CloudDownloadIcon'],
            ['Folder', 'FolderIcon'], ['File', 'FileIcon'],

            // 社交媒体
            ['Facebook', 'FacebookIcon'], ['Twitter', 'TwitterIcon'],
            ['LinkedIn', 'LinkedInIcon'], ['GitHub', 'GitHubIcon'],

            // 其他常用
            ['Dashboard', 'DashboardIcon'],
            ['Email', 'EmailIcon'],
            ['Phone', 'PhoneIcon'],
            ['Lock', 'LockIcon'],
            ['AccountCircle', 'AccountCircleIcon'],
            ['ShoppingCart', 'ShoppingCartIcon'],
            ['Visibility', 'VisibilityIcon'],
            ['VisibilityOff', 'VisibilityOffIcon']
          ]
        }
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true
      }
    })
  ]
});