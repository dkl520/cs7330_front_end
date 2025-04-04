# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



src/
├── pages/
│   ├── auth/                 # 认证相关页面
│   │   ├── Login.jsx        # 登录页面
│   │   └── Register.jsx     # 注册页面
│   ├── home/                # 主页相关
│   │   └── HomePage.jsx     # 主页/Feed流
│   ├── posts/               # 帖子相关
│   │   ├── PostList.jsx     # 帖子列表
│   │   ├── PostDetail.jsx   # 帖子详情
│   │   └── PostCreate.jsx   # 创建帖子
│   ├── users/               # 用户相关
│   │   ├── Profile.jsx      # 用户资料
│   │   └── Settings.jsx     # 用户设置
│   ├── projects/            # 项目相关
│   │   ├── ProjectList.jsx  # 项目列表
│   │   └── ProjectDetail.jsx # 项目详情
│   └── institutes/          # 研究所相关
│       └── InstituteDetail.jsx # 研究所详情




project-structure/
├── src/
│   ├── components/      # 可重用组件
│   │   ├── Layout/      # 布局组件
│   │   ├── Post/        # 帖子相关组件
│   │   ├── User/        # 用户相关组件
│   │   ├── Project/     # 项目相关组件
│   │   └── Analysis/    # 分析相关组件
│   ├── pages/           # 页面组件
│   ├── contexts/        # React上下文
│   ├── hooks/           # 自定义钩子
│   ├── api/             # API调用
│   ├── utils/           # 工具函数
│   ├── theme/           # Material UI主题
│   ├── routes/          # 路由配置
│   ├── App.jsx
│   └── main.jsx
└── package.json





根据您提供的ER模型图，我看到这是一个社交媒体平台，涉及用户、帖子、项目、研究所和分析结果等实体。以下是我建议的前端页面设计：
核心页面设计
1. 登录/注册页面

用户注册表单（包含用户名、姓名、国家等字段）
登录表单
社交媒体登录选项

2. 主页/Feed页面

帖子流（显示关注用户的帖子）src/
├── pages/
│   ├── auth/                 # 认证相关页面
│   │   ├── Login.jsx        # 登录页面
│   │   └── Register.jsx     # 注册页面
│   ├── home/                # 主页相关
│   │   └── HomePage.jsx     # 主页/Feed流
│   ├── posts/               # 帖子相关
│   │   ├── PostList.jsx     # 帖子列表
│   │   ├── PostDetail.jsx   # 帖子详情
│   │   └── PostCreate.jsx   # 创建帖子
│   ├── users/               # 用户相关
│   │   ├── Profile.jsx      # 用户资料
│   │   └── Settings.jsx     # 用户设置
│   ├── projects/            # 项目相关
│   │   ├── ProjectList.jsx  # 项目列表
│   │   └── ProjectDetail.jsx # 项目详情
│   └── institutes/          # 研究所相关
│       └── InstituteDetail.jsx # 研究所详情
创建新帖子的快捷按钮
侧边栏（导航、推荐项目等）

3. 用户个人资料页面

用户基本信息（用户名、姓名、国家等）
用户发布的帖子列表
用户参与的项目
编辑个人资料选项

4. 帖子详情页面

帖子内容展示
点赞/不喜欢按钮
转发功能
多媒体内容查看器
相关项目分析

5. 项目页面

项目详情（名称、管理者、开始/结束日期）
相关研究所信息
项目领域列表
项目相关帖子

6. 研究所页面

研究所详情
赞助的项目列表
相关用户

7. 分析结果页面

基于项目帖子的分析结果展示
数据可视化组件
按字段筛选的分析结果

8. 管理面板（针对管理员）

用户管理
内容管理
项目管理
研究所管理

技术实现
使用Vite + React + Material UI的技术栈，我建议：



1. SOCIAL_MEDIA （社交媒体）
   
   - 包含 media_id, name 等基本信息
2. USER （用户）
   
   - 包含用户基本信息：username, first_name, last_name
   - 个人信息：country_of_birth, country_of_residence, age, gender
   - 验证状态：is_verified
3. INSTITUTE （研究所）
   
   - 基本信息：institute_id, name
4. PROJECT （项目）
   
   - 项目信息：project_id, name
   - 管理者信息：manager_first_name, manager_last_name
   - 时间信息：start_date, end_date
5. POST （帖子）
   
   - 内容信息：content, posted_time
   - 位置信息：location_city, location_state, location_country
   - 互动数据：likes, dislikes
   - 多媒体标记：has_multimedia
主要关系：

1. USER 和 POST 之间的关系：用户可以发布帖子
2. PROJECT 和 POST 之间的关系：通过 PROJECT_POST 关联表建立分析关系
3. PROJECT 和 INSTITUTE 之间的关系：研究所赞助项目
4. PROJECT_FIELD 表：定义项目的研究领域
这个设计支持：

- 用户社交媒体活动的追踪
- 项目管理和分析
- 研究所与项目的关联
- 项目研究成果的记录和分析