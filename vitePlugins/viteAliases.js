const fs = require('fs')
const path = require('path')
/**
 * 区分目录
 * @param {Array} arrs 
 * @param {String} bathPath 
 * @returns {Promise}
 */
function disDirAndFile(arrs, bathPath) {
    return new Promise((resovle, reject) => {
        const result = {
            dirs: [],
            files: []
        }
        // 拆分数据： 文件 和 目录, forEach 回调函数里面执行异步文件状态读取
        arrs.forEach(async(item, index, arr) => {
            const dirOrFileStat = await fs.promises.stat(path.resolve(__dirname, bathPath+'/'+item))
            const isDir = dirOrFileStat.isDirectory()
            if(isDir){
                result.dirs.push(item)
            } else {
                result.files.push(item)
            }
            if (index === arr.length - 1) {
                resovle(result)
            }
        })
    })
    
}

/**
 * 获得最终配置alias对象
 * @returns { Object }
 */
async function getAliasConfig() {
    const result = {
        '@': path.resolve(__dirname, '../src')
    }
    const readDirAndFiles =  await fs.promises.readdir(path.resolve(__dirname, '../src'))

    // 区分文件和目录
    const diffResult = await disDirAndFile(readDirAndFiles, '../src')
    diffResult.dirs.forEach(itemName => {
        result[`@${itemName}`] = path.resolve(__dirname, '../src/' + itemName)
    })
    return result
}
module.exports = () => {
    return {
        name: 'vite:alias',
        async config(config, env) {
            config.resolve.alias = await getAliasConfig()
        }
    }
}