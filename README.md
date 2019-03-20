# 简介
  demo为学习webpack在项目中的配置而写，主要记录实际项目中所用配置的学习过程和遇到的问题及解决方案,新手上路,错漏难免,敬请指正
  
# demo包含功能
  version 1.0.0主要包含以下功能:
  1. webpack基本配置,区分本地开发环境、开发完成的编译打包配置
  2. 本地开发环境配置了本地调试服务器(通过参数可自定义启动端口和环境)、热更新、css模块转换、js、less编译、css兼容prefix自动添加等
  3. build打包配置包含 js、css编译压缩、css兼容prefix自动添加、babel es6转换、自动生成html文件、js拆分代码按需加载等项目实用功能

# demo 演示
  1. clone代码
  2. 执行reset.sh shell脚本,清除依赖、删除编译代码、重新安装依赖
  3. 启动本地调试服务器 npm start/启动编译命令npm run build (具体命令参考package.json中scripts字段)

# 初始化
  npm init来初始化package.json
  配置.gitignore,如node_modules、编译代码输出目录dist(自己创建)等
  
# 安装必需依赖
  此1.0.0版本demo为webpack项目基础配置,未引入框架,只需兼容编译es6语法,所以必需依赖只有webpack、webpack-cli(新版本webpack如不安装webpack-cli使用限制较多)
## 如何区分依赖应该装到dependencies还是devDependencies?
    这两个的区别是在于：我们这个项目如果被发布成npm依赖包的话，别人用npm命令安装下来会不会自己把项目所用的依赖一起安装掉。如果是写在devDependencies的话，不会自动安装
    我们这个demo并不会发布成npm依赖包，所以现在装哪里没有区别，但可以这么区分：
      如果构建前和构建时要用到的东西考虑放在devDependencies里去，比如webpack工具、less等
      如果是构建后的代码里还要用到的东西，就放在dependencies里，比如react或者axios等
      
# webpack简单配置
  初始不需要配置过多内容,基础配置在webpack_conf/webpack.config.js,开发环境的配置在webpack_conf/webpack.dev.config.js,build的配置在webpack_conf/webpack.build.config.js,开发和build配置继承webpack.config.js,其中各属性简介如下(具体请查阅webpack文档):
  * mode: 模式, 其值为development、production或none,webpack会对每个值进行相应优化
  * context: 指定基础目录为根目录
  * resolve: 指定自动解析哪些格式的文件，这样代码里import和require的时候就不用写后缀名了
  * entry: 指定入口文件
  * output: 指定编译后输出目录
  * module: 配置rules,指定当webpack遇到相应后缀文件时，调用相应的loader进行解析，可配置忽略node_modules里匹配的文件,加快处理速度

# 主要配置介绍
  1. webpack-merge依赖主要用来合并webpack配置
  2. webpack-dev-server 用来启动本地开发服务器
  3. html-webpack-plugin 让项目构建之后生成一个html文件
## 本地开发环境配置简介
  需要注意的是rules的解析顺序是从下到上的,编写时需要注意,比如需要先解析less为css,再进行prefix添加和压缩等
  less的处理
  1. 需要安装的依赖less、less-loader、css-loader、style-loader
  2. loader的作用为解析相应类型的文件:less是less-loader所依赖的基础库，less-loader用来解析less文件转成css文件,css-loader则是把css文件解析到js里，成为模块,style-loader是把解析到js里css模块，通过生成`<style>`标签注入到页面中
  3. prefix的添加是通过postcss的插件postcss-preset-env完成的,配置策略可写在根目录下的.postcssrc中,比如哪些属性需要自动添加,postcss-preset-env也可指定需要兼容的浏览器范围，比如最近两个版本的浏览器,配置可写在.browserslistrc中
  4. css-loader中提供了css-modules功能，开启方式为再css-loader中添加options,设置modules为true，并设置样式命名规则，避免样式命名冲突，此功能简单来说就是把css的类名做一个简单映射,js导入样式文件后可以用对应属性拿到映射后的类名,以便在模块中使用,使用示例详见src/static/less/test.less和src/index.js,配置详见webpack.dev.config.js rules中的oneOf分支,有选择的开启是因为如果全部开启，所有的css都会转换成css-modules，但我们实际应用中，哪里需要开启应该是可控的
## build打包配置简介
  1. css不需要像开发环境一样作为style标签插入页面中，而应该压缩为外部样式文件插入到页面中
  2. build时应该生成一个html文件，讲编译打包完成的css和js引入进来
  3. 支持按环境打包，支持if else来判断所处环境，并且编译完成后，最终代码将不会出现其他环境内容，要实现这个功能，需要用到webpack内置的DefinePlugin插件，添加全局的环境变量
  4. js的压缩。js的压缩用到了uglifyjs-webpack-plugin依赖，笔者所安装的webpack版本为3.x，默认不支持压缩es6，需要安装配置babel依赖，笔者默认安装的babel-loader版本为8.x，需要7.x的babel-core,应该安装@babel/core和@babel/preset-env而不是babel-core和babel-preset-env，各位build时如果报错，需根据自己的webpack版本和babel-loader版本安装正确的依赖
  5. js的代码拆分和按需加载。如果引入三方包，打包却只生成一个index.js文件的话，会引起文件过大，加载较慢，并且每次微小改动都会引起用户端静态资源缓存失效，重新加载。所以我们可以把比较稳定、基本不会改动的基础工具和三方包单独打一个vendor.js其他业务相关代码打包到index.js,配置参见webpack.build.config.js中optimization的splitChunks配置
    
# todo
  1. 打包结果成分分析
  2. 引入react，完成react的webpack配置

  


