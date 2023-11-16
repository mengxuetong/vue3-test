module.exports = {
    moduleFileExtensions: ['vue', 'js', 'ts', 'tsx'],
    testEnvironment: 'jsdom',
    transform: {
        "\\.[jt]sx?$": "babel-jest",
      '^.+\\.vue$': '@vue/vue3-jest', // vue 文件用 vue-jest 转换
    //   '^.+\\.ts$': 'ts-jest', // ts 文件用 ts-jest 转换
    },
    // 匹配 __tests__ 目录下的 .js/.ts 文件 或其他目录下的 xx.test.js/ts xx.spec.js/ts
    // testRegex: '(/tests/*|(\\.|/)(test|spec))\\.(ts|tsx)$',
    // testMatch: [
    //     '**/tests/**/*.[jt]s?(x)',
    //     '**/?(*.)+(spec|test).[tj]s?(x)',
    //     '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
    // ],
    // 支持源代码中相同的 `@` -> `src` 别名
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    // 是否开启将测试覆盖率信息输出为报告
    // collectCoverage: false,
    // 报告应从哪些文件中收集
    // collectCoverageFrom: [
    //   'src/packages/__VUE/**/*.{js,jsx,ts,tsx,vue}',
    //   '!**/node_modules/**',
    //   '!**/demo.vue/**',
    //   '!**/index.taro.vue/**'
    // ]
  };