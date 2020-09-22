### 事前準備
* リポジトリクローン
```
$ git clone https://github.com/funawo/graphql-chat-app.git
```
* ディレクトリ移動
```
$ cd graphql-chat-app
```
* シェル変数設定
```
WORK_DIR=$(pwd)
```
### mongoの起動
* ディレクトリ移動
```
$ cd $WORK_DIR/mongo
```
* イメージの作成
```
$ docker image build -t mongo-chat-app .
```
* コンテナ起動
```
$ docker container run -d --name mongo -p 27017:27017 mongo-chat-app
```
### GraphQLサーバ起動
* ディレクトリ移動
```
$ cd $WORK_DIR/graphql-chat-app-server
```
* パッケージインストール
```
$ npm install
```
* 環境設定ファイルの編集
```
$ touch .env
$ # DB_HOST=mongodb://ユーザ:パスワード@localhost:27017/DB名
$ echo "DB_HOST=mongodb://graphql_user:graphql_user@localhost:27017/chat_app" > .env
```
* 起動
```
$ npm start
```
### Reactアプリケーション起動
* ディレクトリ移動
```
$ cd $WORK_DIR/graphql-chat-app-client
```
* パッケージインストール
```
$ npm install
```
* 環境設定ファイルの編集
```
$ touch .env
$ echo "REACT_APP_GRAPHQL_HTTP_URL=http://<GraphQLサーバのIP>:4000/graphql" >> .env
$ echo "REACT_APP_GRAPHQL_WS_URL=ws://<GraphQLサーバのIP>:4000/graphq" >> .env
```
* 起動
```
$ npm start
```