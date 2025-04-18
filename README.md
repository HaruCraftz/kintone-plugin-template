# Kintone Plugin Template

```
root/
├── plugin/                         # バンドル後のoutput先
│   ├── contents/
│   │   ├── config.html
│   │   └── icon.png
│   ├── js/
│   │   ├── config.js
│   │   ├── desktop.js
│   │   └── mobile.js
│   └── css/
│       ├── config.css
│       ├── desktop.css
│       └── mobile.css
│
├── src/
│   ├── components/                 # 汎用的なコンポーネントを格納
│   ├── config/                     # プラグイン設定画面のReactカスタマイズ
│   ├── contents/                   # プラグイン設定画面のhtmlとicon
│   │   ├── config.html
│   │   └── icon.png
│   ├── desktop/                    # kintoneデスクトップ版におけるプラグイン機能
│   ├── mobile/                     # kintoneモバイル版におけるプラグイン機能
│   ├── lib/                        # 汎用的な関数/定数を格納
│   └── styles/                     # tailwindcss
│
├── .husky/                         # huskyの設定ディレクトリ
├── .env                            # 環境情報
├── .gitignore                      # Git管理対象外の設定
├── .prettierrc                     # Prettier 設定
├── .eslint.config.js               # ESLint 設定
├── manifest.json                   # プラグインのマニフェストJSON
├── package.json                    # 依存関係
├── postcss.config.js               # PostCSS 設定
├── tailwind.config.js              # TailwindCSS 設定
├── tsconfig.json                   # TypeScript 設定
├── webpack.common.cjs              # Webpack 共通設定
├── webpack.dev.cjs                 # Webpack 開発用設定
└── webpack.prod.cjs                # Webpack 本番用設定
```
