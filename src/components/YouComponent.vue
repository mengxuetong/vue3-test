<template>
    <div>
        <p>v: {{ v }}</p>
        <p>v2: {{ v2 }}</p>
        <h5>暴露出去的方法：</h5>
        <p>add: {{ num }}</p>
        <ul class="list" v-bind="$attrs">
            <li v-for="(item, index) in listData" :key="index">
                <slot
                    name="list"
                    :index="index"
                    :params="item">
                </slot>
            </li>
        </ul>
        
    </div>
</template>
<script setup>
import { ref, useAttrs, useSlots } from 'vue';
/**
 * definePorops的使用
 */
// 无默认值形式
defineProps({
    v: {
        type: Number,
        default: 1
    },
    v2: {
        type: Number,
        default: 1
    },
    listData: {
        type: Array,
        default: []
    }
})
const num = ref(0)
const add = () => {
    num.value += 1
}
// 向外部暴露属性或方法
defineExpose({
    add
})

// 定义options
defineOptions({
    inheritAttrs: false,
    name: 'you-comm'
})

const attrs = useAttrs()
console.log(attrs)
const slots = useSlots()
console.log(slots)
</script>
<style scoped>
.list {
    color: #000;
}
</style>
