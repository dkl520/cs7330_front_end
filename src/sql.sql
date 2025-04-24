根据你提供的项目要求文档以及 ER 模型图，我们可以将以下 **查询需求** 分为三大类，并分别设计对应的 SQL 查询语句。

---

## ✅ 1. 查询帖子（Querying Post）

---

### a) **查找某个社交媒体上的所有帖子**

```sql
SELECT p.post_id, p.content, sm.name AS social_media, u.username, p.posted_time
FROM POST p
JOIN USER u ON p.user_id = u.user_id
JOIN SOCIAL_MEDIA sm ON p.media_id = sm.media_id
WHERE sm.name = 'Facebook';
```

---

### b) **查找特定时间段内的帖子**

```sql
SELECT p.post_id, p.content, sm.name AS social_media, u.username, p.posted_time
FROM POST p
JOIN USER u ON p.user_id = u.user_id
JOIN SOCIAL_MEDIA sm ON p.media_id = sm.media_id
WHERE p.posted_time BETWEEN '2025-01-01' AND '2025-12-31';
```

---

### c) **查找某个社交媒体上，某个用户名发的帖子**

```sql
SELECT p.post_id, p.content, sm.name AS social_media, u.username, p.posted_time
FROM POST p
JOIN USER u ON p.user_id = u.user_id
JOIN SOCIAL_MEDIA sm ON p.media_id = sm.media_id
WHERE sm.name = 'Instagram' AND u.username = 'user123';
```

---

### d) **查找某个用户（first_name / last_name）发布的帖子**

```sql
SELECT p.post_id, p.content, sm.name AS social_media, u.username, p.posted_time
FROM POST p
JOIN USER u ON p.user_id = u.user_id
JOIN SOCIAL_MEDIA sm ON p.media_id = sm.media_id
WHERE u.first_name = 'John' AND u.last_name = 'Doe';
```

---

### e) **每个帖子对应的所有分析项目**

```sql
SELECT p.post_id, pj.name AS project_name
FROM POST p
JOIN PROJECT_POST pp ON p.post_id = pp.post_id
JOIN PROJECT pj ON pp.project_id = pj.project_id;
```

---

## ✅ 2. 查询实验（Querying Experiment / Project）

---

### a) **根据项目名称查找所有分析的帖子及结果**

```sql
SELECT 
    pj.name AS project_name,
    p.post_id,
    p.content,
    af.field_name,
    ar.value
FROM PROJECT pj
JOIN PROJECT_POST pp ON pj.project_id = pp.project_id
JOIN POST p ON pp.post_id = p.post_id
LEFT JOIN ANALYSIS_RESULT ar ON pp.project_post_id = ar.project_post_id
LEFT JOIN PROJECT_FIELD af ON ar.field_id = af.field_id
WHERE pj.name = 'Sentiment Analysis Project';
```

---

### b) **每个字段有值的帖子占比**

```sql
SELECT 
    pf.field_name,
    COUNT(ar.result_id) AS num_results,
    COUNT(DISTINCT pp.project_post_id) AS total_posts,
    ROUND(COUNT(ar.result_id) * 100.0 / COUNT(DISTINCT pp.project_post_id), 2) AS percentage_with_value
FROM PROJECT pj
JOIN PROJECT_FIELD pf ON pj.project_id = pf.project_id
JOIN PROJECT_POST pp ON pj.project_id = pp.project_id
LEFT JOIN ANALYSIS_RESULT ar ON ar.project_post_id = pp.project_post_id AND ar.field_id = pf.field_id
WHERE pj.name = 'Sentiment Analysis Project'
GROUP BY pf.field_name;
```

---

## ✅ 3. 附加功能（仅对 CS7330）

---

### **先选定一个 post 查询条件，然后列出相关的所有实验及分析字段**

```sql
-- 先通过条件查询 post
WITH FilteredPosts AS (
  SELECT p.post_id
  FROM POST p
  JOIN USER u ON p.user_id = u.user_id
  WHERE u.first_name = 'Alice'
)

-- 查询所有与这些 post 关联的项目及分析字段
SELECT 
    fp.post_id,
    pj.name AS project_name,
    pf.field_name,
    ar.value
FROM FilteredPosts fp
JOIN PROJECT_POST pp ON fp.post_id = pp.post_id
JOIN PROJECT pj ON pp.project_id = pj.project_id
LEFT JOIN ANALYSIS_RESULT ar ON pp.project_post_id = ar.project_post_id
LEFT JOIN PROJECT_FIELD pf ON ar.field_id = pf.field_id;
```

---

这些查询语句覆盖了项目要求中提到的所有信息提取需求，也能很好地支持前端展示和后端逻辑开发。你可以将其作为 Django ORM 查询的基础逻辑，进一步封装为 API。需要我帮你把这些 SQL 转成 Django ORM 吗？