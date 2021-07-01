# 内部構造

`ssssdt` はシンプルさと柔軟性の両立を目指しています。


## ディレクトリ構造

```
ssssdt
├── bin
│   ├── build.js
│   ├── config.js
│   ├── dev.js
│   ├── helper
│   └── jobs
├── package.json
├── src
│   ├── ejs
│   │   ├── _footer.ejs
│   │   ├── _header.ejs
│   │   ├── _livereload.ejs
│   │   └── pages
│   ├── js
│   ├── sass
│   └── static
│       └── images
└── public
    ├── assets
    │   ├── css
    │   ├── images
    │   └── js
    └── index.html
```

### `bin`

開発に使うスクリプトを格納しています。


#### `bin/jobs/*.js`

ビルドに必要な処理のひとつひとつを別個のJavascriptとして用意・格納しています。


#### `bin/helper/*.js`

`bin` 内のスクリプトで共通する処理をモジュール化し、ここに格納しています。





### `src`

Web ページのソースとなるファイルを格納します。



### `public`

このディレクトリに成果物が出力されます。



## ビルド工程

すべてのビルド処理 (例: EJS を HTML に変換する) は、`bin/jobs` 以下のスクリプトを実行することで行います。


| スクリプト              | 目的                          |
|-------------------------|-------------------------------|
| `bin/jobs/buildEjs.js`  | `.ejs` → `.html`              |
| `bin/jobs/buildSass.js` | `.scss` → `.css`              |
| `bin/jobs/buildJs.js`   | `.js` のバンドルと browserify |
| `bin/jobs/serve.js`     | 開発用ローカルサーバー        |



`bin/build.js` , `bin/dev.js` は `bin/jobs` 以下のスクリプトをまとめて実行するためのラッパースクリプトです。
