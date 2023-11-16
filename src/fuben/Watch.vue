<template>
    <div>
       <h3> watchEffect(): 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。</h3>
        <div>
            <p>{{ count }}</p>
            <button @click="addCount">增加count</button>
        </div>
        <div>
            <p>{{ count1 }}</p>
            <button @click="addCount1">增加count1</button>
        </div>
    </div>
</template>
<script setup>
    import { watchEffect, ref, watchPostEffect, watchSyncEffect, watch } from 'vue';
    const count = ref(0)
    const count1 = ref(0)
    // 立即执行函数，自动追踪依赖变化，触发回调
    // const stopWatch = watchEffect((onCleanup) => {
    //     if (count.value< 10) {
    //         console.log(count.value)
    //     }
    //     console.log('判断外count', count.value)
    // }, {
    //     flush: 'post', // default pre 组件渲染之前执行, post 渲染之后执行回调， sync 依赖改变时同步执行回调
    //     onTrack(e) {
    //         console.log('onTrack', e) // 初次执行一次
    //     },
    //     onTrigger(e) {
    //         console.log('onTrigger', e) // 后续的交互每次执行
    //         if (count.value === 10) {
    //             stopWatch() // 取消观察
    //         }
    //     }
    // })
    const addCount = () => {
        count.value += 1
    }
    const addCount1 = () => {
        count1.value += 1
    }
    // 使用 flush: 'post' 选项时的别名. 组件渲染之后执行
    // watchPostEffect(() => {

    // }, {})

    // 追踪的数据变化时，同步执行
    // watchSyncEffect(() => {
    //     if (count.value > 1) {
    //         count.value -= 1 // 同步执行，不管add 怎么增加，count 值始终是1
    //     }
    // })

    // 监听一个追踪
    watch(count, () => {
        console.log('watch count', count.value)
    })
    // // 监听多个，监听回调都是同时执行的， 新的api不再推荐使用, 推荐使用watchEffect
    // watch([count1, count], [() => {
    //     console.log('watch count1', count1.value)
    // }, () => {
    //     // console.log('watch count1', count1.value)
    //     console.log('watch count', count.value)
    // }])
</script>