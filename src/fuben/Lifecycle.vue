<template>
    <div>
        生命周期钩子：
        <p>onMounted(): 注册一个回调函数，在组件挂载完成后执行。</p>
        <p>{{ count }}</p>
        <button @click="onAddCount">增加Count</button>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, onUpdated, onBeforeUnmount, ref, getCurrentInstance, onBeforeUpdate, onBeforeMount, onErrorCaptured, onRenderTracked, onRenderTriggered, onActivated, onDeactivated, onServerPrefetch, provide, inject } from "vue";
const count = ref(0)
const { proxy } = getCurrentInstance()
proxy.name = 'Lifecycle'
const global = inject('global')
console.log('inject', global)
console.log(global.name)
const onAddCount = () => {
    count.value += 1
}
onBeforeMount(() => {
    console.log('组件挂载之前')
})
onMounted(() => {
    console.log('组件挂载之后', count.value)
})
onBeforeUpdate(() => {
    console.log('组件dom更新之前')
})
onUpdated(() => {
    console.log('组件dom更新之后')
})
onBeforeUnmount(() => {
    console.log('停止挂载本组件前', proxy.name)
})
onUnmounted(() => {
    console.log('停止挂载本组件')
})
onErrorCaptured((err) => {
    console.log('capture err', err)
    return false
})
onRenderTracked((e) => {
    console.log('event', e)
})
onRenderTriggered((e) => {
    console.log('event triggered', e)
})
onActivated(() => {
    console.log('keep-alive 当组件被插入到 DOM 中时调用')
})
onDeactivated(() => {
    console.log('keep-alive 当组件从 DOM 中被移除时调用。')
})
onServerPrefetch(async() => {
    console.log('服务器端抓取数据')
})
</script>
<style>
</style>