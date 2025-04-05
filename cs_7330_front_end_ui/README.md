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




1. 数据录入接口

项目基本信息录入

录入项目名称（唯一标识）
项目经理信息（姓名）
所属机构信息
项目起止日期


帖子关联接口

将帖子与项目关联
检查帖子是否已存在，避免重复存储
录入帖子基本信息（社交媒体平台、发布者、发布时间等）


分析结果录入

为特定项目的特定帖子录入分析结果
支持部分结果录入（不要求所有字段都有值）
按项目定义的字段录入结果值



2. 帖子查询接口
提供以下查询条件（可组合使用）：

按社交媒体平台查询

输入：平台名称
输出：符合条件的帖子列表


按时间段查询

输入：开始时间和结束时间
输出：该时间段内的帖子列表


按用户名和平台查询

输入：用户名和社交媒体平台
输出：该用户在特定平台发布的帖子


按发布者姓名查询

输入：发布者的姓/名
输出：该发布者的所有帖子



每次查询都应返回：

帖子文本内容
发布者信息（社交媒体/用户名）
发布时间
与该帖子关联的项目列表

3. 项目查询接口

项目分析结果查询

输入：项目名称
输出：

与该项目关联的所有帖子
每个帖子的分析结果（如有）
每个分析字段的填充率（有值的帖子百分比）





4. 高级查询接口（仅适用于7330学生）

组合查询接口

先使用帖子查询条件查询帖子
然后列出与这些帖子关联的所有项目及详细信息














社交媒体文本
数据分析的基本单位是社交媒体的文本帖子。它可以是短文本或长文章。在本项目中，我们只考虑文本帖子（不包括图片/视频，如果有，则仅用URL表示，并存储为文本）。文本长度可以是任意的。

每条帖子来自某个特定的社交媒体（如Facebook、Instagram等）。我们假设每个社交媒体的名称是唯一的。

每条帖子由该社交媒体上的某个用户发布。用户的用户名是一个最长40个字符的字符串。我们假设用户名在同一个社交媒体内是唯一的，但不同社交媒体之间可能有相同的用户名（例如，Facebook和Instagram上都可能存在名为“user123”的用户，我们不假设他们是同一个人）。这些信息都需要记录下来。

此外，我们还需要存储帖子本身的发布时间（年/月/日/时/分，秒可能可用也可能不可用）。

帖子可能会被其他用户转发，在这种情况下，我们需要记录转发者及其转发时间。

我们假设同一个用户在同一个社交媒体上不能在同一时间发布多条帖子，但可以在不同社交媒体上同时发布多个帖子。

还有一些可能可用、也可能不可用的信息，如果存在，我们需要记录它们，包括：

发布地点（城市、州、国家）；

点赞数 和 点踩数（非负整数）；

帖子是否包含多媒体内容（如视频、音频，但不需要区分具体类型）。

用户信息
对于每个发布者，我们希望存储以下信息（如果可用）：

名字（first name） 和 姓氏（last name）；

出生国家 和 居住国家；

年龄 和 性别；

用户是否是该社交媒体上的**“认证用户”**。

项目与分析
文本是由不同的研究项目来分析的。

每个项目都有一个唯一的项目名称，一个项目负责人（需要存储其姓氏和名字），以及研究所名称（研究所名称是唯一的）。

我们还需要记录项目的起始日期和结束日期（格式为yy/mm/dd）。结束日期必须不早于开始日期。

分析结果的存储
每个项目会分析数据库中的部分文本。对于每个项目，每条被分析的文本都会被赋予一组字段（fields），这些字段表示分析结果。例如：

某个项目可能分析帖子并返回其政治倾向（左/中/右）；

另一个项目可能统计文本中提及的对象数量（非负整数）并分析帖子整体的情感倾向（积极/消极）。

对于每个项目，我们需要记录每条文本对应的字段集。

每个字段都有一个名称（字符串），我们假设字段名称在同一项目内是唯一的。

需要存储每条被分析的帖子对应的每个字段的分析结果（字段值为字符串）。

任务要求
你需要设计一个关系型数据库（Relational Database），使用MySQL或MariaDB来存储所有信息。

同时，你需要开发一个应用程序，用于向数据库输入信息并检索信息。

应用功能要求
1. 数据录入功能
录入项目信息（包括项目名称、负责人、研究所、起始和结束日期）。

录入项目关联的帖子（如果帖子已存在，则不应重复存储）。

录入分析结果（系统应允许部分录入，即不要求所有字段的结果一次性输入完整）。

2. 帖子查询功能
系统应允许使用以下条件查询帖子，支持AND（且）组合查询：

查询某个社交媒体上的帖子；

查询某个时间范围内的帖子；

查询某个社交媒体上由特定用户名发布的帖子；

查询由特定姓名（名字/姓氏）的用户发布的帖子。

对于每个查询结果，系统应返回：

帖子内容；

发布者信息（社交媒体/用户名）；

发布时间；

该帖子参与的所有研究项目。

3. 项目查询功能
系统应允许输入项目名称，并返回：

该项目分析的所有帖子；

每条帖子已录入的分析结果；

每个分析字段的统计情况（该字段有值的帖子占比）。

4. (仅限7330课程学生) 高级查询功能
系统应允许用户先查询一批帖子，然后列出所有与这些帖子相关的实验（研究项目），并提供上述实验查询的详细信息。

