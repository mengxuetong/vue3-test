##### 示例demo
@assets
@components
@stores
@utils
```
import someModule from '@utils/...'
import someModule from '@assets/...'
```

##### 使用方式, vite.config.js 里引入
```
import viteAliasPlugin from 'mengViteAliasPlugin'
```
##### 配置plugins
```
plugins: [
    viteAliasPlugin()
]
```