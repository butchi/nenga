i-oshishi-slot-mass-production
====

## 事前に用意するもの
- node.js (version 6.9.1以上)

## 環境構築
```
# 開発に使うnpmパッケージをインストール
yarn

# または
npm install
```

## ファイル構成

- `README.md`
  - このファイルです。
- `package.json`
  - 依存するnpmパッケージに関する設定ファイルです。
- `gulpfile.babel.js`
  - gulpタスクに関する設定ファイルです。（`.babel.js`となっているのは、es2015で書くための印です）
- `share`
  - Web公開されるファイルの置き場所です。
- `_share.pug`
  - ビルドに必要なソースコードです。

## 開発手順

開発時に必要なタスクは、npm scriptおよびgulp.jsで管理されています。
shellから以下のコマンドを実行することで、各種ビルド・タスク実行が可能です。

- `npm build`
  - すべてのソースコードをビルドします
  - 基本的には、このコマンドを実行しておくだけで開発が可能なはずです。

## 使用言語

- HTMLテンプレート: [pug](http://jade-lang.com/)

## 依存ライブラリ

`npm install`でインストールされるライブラリ（一部）です。
全てを理解していなくても、開発は問題なく行えますが、挙動に問題がある場合・カスタマイズしたい場合などに参照してみてください。

- [gulp.js](http://gulpjs.com/)
- [Babel](https://babeljs.io/)
