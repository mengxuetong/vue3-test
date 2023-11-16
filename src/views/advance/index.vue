<template>
    <div>
       <h3>响应式 api: 进阶</h3>
        <div>
            shallowRef(): ref() 的浅层作用形式。
            <p>{{ shallowRefState.name }}</p>
            <p>{{ refState.name }}</p>
            <button @click="changeState">changeState</button>
            <p>{{ a.a }}</p>
            customRef() -> useDebouncedRef(): customRef() 预期接收一个工厂函数作为参数，这个工厂函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。
            输入防抖
            <p><input type="text" v-model="text"></p>
            <p>shallowState.name: {{ shallowState.name }}</p>
            <button @click="changeShallow">change shallow</button>
            <p>shallowState.child.name: {{ shallowState.child.name }}  深层属性不变</p>
            <button @click="changeShallow1">change shallow</button>
            shallowReadonly(): readonly() 的浅层作用形式
            <p>直接属性未改变state.foo:{{ state.foo }}</p>
            <p>子嵌套属性改变了state.nested.bar: {{ state.nested.bar }}</p>
            toRaw(): 根据一个 Vue 创建的代理返回其原始对象。
            <p>rawState: {{ rawState }}</p>
            effectScope()
            <p>counter: {{ counter }}</p>
            <p>computed doubled = counter * 2 = {{ doubled }}</p>
            <button @click="addCounter">add counter</button>
        </div>
    </div>
</template>
<script setup>
    import { shallowRef, ref, toRef, reactive, isReactive, watchEffect, triggerRef, customRef, shallowReactive, shallowReadonly, isReadonly, toRaw, markRaw, effectScope,
        computed,
        watch,
        getCurrentScope,
        onScopeDispose
    } from 'vue';
    const shallowRefState = shallowRef({
        name: 'aa'
    })
    const refState = ref({
        name: 'meng',
        age: 34
    })    
    const changeState = () => {
        shallowRefState.value.name = 'bb'
        refState.value.name = ' zheng'
    }
    
    console.log('shallowRefState', shallowRefState)
    console.log('refState', refState)
    const s = {
        a: 1,
        b: 2
    }
    const p = new Proxy(s, {
        get: function(target, attr, receiver) {
            return target[attr]
        },
        set: function(target, attr, val, receiver) {
            target[attr] = val + 1
            return true
        }
    })
    p.a = 0
    console.log('s', s)
    console.log('p', p)
    const a = toRef(p)

    watchEffect(() => {
        console.log('watch shallowRefState', shallowRefState.value.name) // 第一次aa， 第二次cc
    })
    shallowRefState.value.name = 'cc'
    triggerRef(shallowRefState)
    /**
     * 防抖
     * @param {值} value 
     * @param {延时} delay 
     */
    const useDebouncedRef = function(value, delay=200) {
        let timeout
        return customRef((track, trigger) => {
            return {
                get() {
                    track()
                    return value
                },
                set(newValue) {
                    timeout && clearTimeout(timeout)
                    timeout = setTimeout(() => {
                        value = newValue
                        trigger()
                    }, delay)
                }
            }
        })
    }
    const text = useDebouncedRef('meng', 800)
   watchEffect(() => {
    console.log('text:', text.value)
   })
   const handleInput = (event) => {
    console.log(event)
   }
   // 宏任务
//    setTimeout(() => {
//     for (let i = 1; i <= 100000; i++) {
//         console.log('i:', i)
//     }
//    }, 100)
//    setTimeout(() => {
//     console.log('上一个宏任务执行完毕, 本任务1000 * 20 后执行：10001')
//    }, 1000 * 10)

   const shallowState = shallowReactive({
    name: 'nodejs',
    child: {
        name: 'vue'
    }
   })
   const changeShallow = () => {
        shallowState.name = 'nuxt.js'
        // shallowState.child.name = 'react'  会跟着一起改变，重新渲染视图
   }
   const changeShallow1 = () => {
        shallowState.child.name = 'react'
   }
    const state = shallowReadonly({
        foo: 1,
        nested: {
            bar: 2
        }
    })
    // 更改状态自身的属性会失败
    state.foo++
    console.log(state.foo)
    isReadonly(state.nested) // false
    // 这是可以通过的
    state.nested.bar++
    console.log(state.nested.bar)

    const rawState = toRaw(shallowState)
    console.log('rawState', rawState)
    
    const m = markRaw({})
    console.log(isReactive(reactive(m)))

    const counter = ref(1)
    // effectScope()
    const scope = effectScope()
    let doubled
    scope.run(() => {
        doubled = computed(() => counter.value * 2)

        watch(doubled, () => console.log('watch', doubled.value), {
            immediate: true
        })

        watchEffect(() => console.log('watchEffect: ', doubled.value))
    })
    const addCounter = () => {
        counter.value += 1
        scope.stop() // 停止作用域副作用
    }
    const currentScope = getCurrentScope()
    console.log('currentScope', currentScope)
    
    onScopeDispose(() => {
        console.log('scope has been dispose')
    })
   
</script>