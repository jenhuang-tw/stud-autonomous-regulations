# 學生自治法規整理平台

一個線上平台，用於整理、瀏覽和搜尋台灣各級學校學生自治組織的自訂法規。

## 專案目標

* 提供學生自治參與者和學生便捷的法規查詢工具。
* 實現簡潔、現代且響應式的網頁設計。
* 支持自動與手動切換的暗色模式。
* 採用靜態部署，降低維護成本。

## 技術棧

* **前端框架**: Nuxt 3 (Vue 3, Vite)
* **程式語言**: TypeScript
* **CSS 框架**: Tailwind CSS
* **資料儲存**: 純文字檔 (`.txt`) 和 JSON (`.json`)
* **版本控制**: Git / GitHub
* **部署**: GitHub Pages (靜態部署)

## 功能概覽

* **首頁**: 列出所有學生自治組織，提供搜尋功能。
* **組織法規列表**: 顯示特定組織的所有法規。
* **法規瀏覽**: 支援瀏覽法規的最新版本及歷史版本。
* **歷史版本追溯**: 輕鬆切換查看法規的各個修訂版本。
* **社群分享**: 一鍵分享法規頁面至社群媒體。
* **暗色模式**: 提供舒適的夜間閱讀體驗。

## 專案結構

```

.
├── public/                \# 靜態資源，包含法規資料
│   └── regulation-files/  \# 法規資料夾
│       ├── :org/          \# 各學生自治組織
│       │   └── :regulationId/ \# 各法規
│       │       ├── versions.json \# 法規版本資訊
│       │       └── :ymd.txt      \# 各版本法規內容
│       └── organizations.json \# 所有組織基本資訊
├── pages/                 \# 路由頁面
│   ├── index.vue          \# 首頁
│   └── [org]/             \# 學生自治組織相關頁面
│       ├── index.vue      \# 組織法規列表頁
│       └── [regulationId]/ \# 特定法規相關頁面
│           ├── index.vue  \# 法規最新版本頁
│           └── [ymd].vue  \# 法規歷史版本頁
├── components/            \# Vue 組件
├── layouts/               \# 頁面佈局
├── assets/                \# 靜態資產 (CSS, 圖片等)
├── plugins/               \# Nuxt 插件 (GA4)
├── composables/           \# Vue Composition API 組合函數
├── nuxt.config.ts         \# Nuxt 配置
├── package.json
├── tailwind.config.ts
└── tsconfig.json

```

## 開發設置

1.  **安裝依賴**:
    ```bash
    pnpm install
    # 或 npm install
    # 或 yarn install
    ```
2.  **開發伺服器**:
    ```bash
    pnpm dev
    ```
    此命令將啟動一個開發伺服器，通常在 `http://localhost:3000`。
3.  **構建生產環境**:
    ```bash
    pnpm generate
    ```
    這會將網站構建為靜態文件，輸出到 `.output/public` 目錄，用於 GitHub Pages 部署。

## 資料格式

### `public/organizations.json`

```json
[
  {
    "id": "ntpusu",
    "name": "國立臺北大學學生自治會",
    "shortName": "臺北大學學生會",
    "regulations": [
      {
        "id": "student-litigation-law",
        "name": "國立臺北大學學生自治會學生自治訴訟法",
        "shortName": "學生自治訴訟法"
      }
    ]
  },
  {
    "id": "hwshsa",
    "name": "國立虎尾高級中學學生會",
    "shortName": "虎尾高中學生會",
    "regulations": [
      {
        "id": "organization-charter",
        "name": "國立虎尾高級中學學生會組織章程",
        "shortName": "組織章程"
      }
    ]
  }
]
```

### `public/regulation-files/:org/:regulationId/versions.json`

此文件應包含該法規所有版本的元數據。

```json
{
  "current": "111-01-05", // 最新版本的文件名（不含.txt）
  "versions": [
    {
      "date": "111-01-05",
      "fullTitle": "國立臺北大學學生自治會學生自治訴訟法",
      "shortTitle": "學生自治訴訟法",
      "note": "111年1月5日學生議會通過",
      "isCurrent": true,
      "source": "學生會網站",
      "filename": "111-01-05.txt"
    },
    {
      "date": "105-01-01",
      "fullTitle": "國立臺北大學學生自治會學生自治訴訟法",
      "shortTitle": "學生自治訴訟法",
      "note": "105年1月1日學生議會通過 (最初版本)",
      "isCurrent": false,
      "source": "學生會網站",
      "filename": "105-01-01.txt"
    }
  ]
}
```

### `public/regulation-files/:org/:regulationId/:ymd.txt`

純文字文件，頂部包含 YAML Front Matter。

```
---
fullTitle: 國立虎尾高級中學學生會組織章程
shortTitle: 組織章程
note: 2022年2月20日學生代表大會修訂通過
isCurrent: true
source: 學生會網站
---
第一章 總則
第一條 國立虎尾高級中學學生會（以下簡稱本會）為本校最高學生自治團體...
...
```

## 部署到 GitHub Pages

本專案是使用靜態渲染，直接使用 GitHub Pages 部署。

1.  在 `nuxt.config.ts` 中配置 `base` 路徑，例如：`app: { baseURL: '/your-repo-name/' }`（首次部署）
2.  運行 `npm run generate`。
3.  將 `.output/public` 目錄的內容推送到 GitHub Pages 的部署分支 (通常是 `gh-pages` 分支)。

您可以在 package.json 中設定 deploy 指令 `"deploy": "npm run generate && gh-pages -d .output/public"`。如此一來，只需要執行 `npm run deploy` 即可完成後二步驟。

## 版權與授權

各學生自治組織法規之著作權，仍歸其所有。