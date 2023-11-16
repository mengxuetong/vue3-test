<template>
    <div>
        Pina： 
        <!-- <p> store.count count: {{ store.count }}</p> -->
        <p>count: {{ count }}</p>
        <p>countAddOne count + 1 =: {{ store.countAddOne }}</p>
        <p>countAddOnePlus count + 1 =: {{ store.countAddOnePlus }}</p>
        <p>带参数store 的 getter countAddOnePlus *  params =: {{ countParams(2) }}</p>
        <button @click="increment">increment add</button>
        <button @click="resetStore">reset store</button>
        <button @click="chageState">chage state</button>
    </div>
</template>
<script setup>
import { useCounterStore } from '@/stores/counter'
import { mapState, storeToRefs } from 'pinia';
import { computed } from 'vue'
const store = useCounterStore()
const { count, countParams } = storeToRefs(store)

// const countAddOne = computed(() => store.countAddOne)
const { increment } = store
// 重置状态
const resetStore = () => {
    store.$reset()
}
// 改变状态
const chageState = () => {
    // store.$state = { count: 5}
    // store.$patch(state => {
    //     state.count = 10
    // })
    store.$patch({
        count: 10
    })
}
// 订阅状态
store.$subscribe((mutation, state) => {
    console.log('mutation.type', mutation.type)
    console.log('mutation.storeId', mutation.storeId)
    console.log('mutation.payload', mutation.payload)
})

function myProxy(obj) {
    Object.keys(obj).forEach((key) => {
        if (typeof key != 'object') {
            let _p = obj[key] // 初始值
            Object.defineProperty(obj, key, {
                get: function() {
                    return _p
                },
                set: function(val) {
                    _p = val
                    console.log(`${key}: `, _p)
                }
            })
        } else {
            myProxy(obj[key])
        }
        
    })
}
</script>