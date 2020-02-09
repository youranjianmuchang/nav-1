# 开发

````
npm install -g parcel-bundler
parcel src/index.html

````

# build 命令

添加.gitignore文件
/.cache/
/node_modules/
/.idea/

````
parcel build src/index.html --no-minify --pulic-url ./

````

# build脚本

````
yarn init -y

````

在package.json中添加
"scripts": {
    "build": "rm -rf dist && parcel build src/index.html --no-minify --public-url ./"
  }