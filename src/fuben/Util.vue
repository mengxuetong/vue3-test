<template>
    <div>
       <h3>响应式 API：工具函数</h3>
        <div>
            isRef():检查某个值是否为 ref
            <p>{{ count }}</p>
            <button @click="addCount">增加count</button>
        </div>
        <div>
            unref(): 如果参数是 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 计算的一个语法糖
            <p>{{ count1 }}</p>
            <button @click="addCount1">增加count1</button>
            <p>name: {{ name }}</p>
            <button @click="changeName">name不改变非响应式值</button>
            toRef(): 可以将值、refs 或 getters 规范化为 refs (3.3+)
            <p>age: {{ ageRef }}</p>
            <p>state.age: {{ state.age }}</p>
            toRefs(): 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的
            <p>解构state的age: {{ age }}</p>
            <button @click="changeAge">改变state.age</button>
            <p>isProxy(): 检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理</p>
            <p>isReactive(): 检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理。</p>
            <p>isReadonly(): </p>
        </div>
    </div>
</template>
<script setup>
    import { ref, isRef, unref, toRef, reactive, toRefs, isProxy, isReactive, readonly} from 'vue';
    const count = ref(0)
    const count1 = ref(0)
    let name = 'meng' // 非响应式，观察不到
    
   const addCount = () => {
    console.log(isRef(count))
    if (isRef(name)) {
        count.value += 1
    }
   }
   const addCount1 = () => {
    count1.value = unref(count1) + 1
   }
   console.log(unref(name)) // meng
   const changeName = () => {
    name = 'zheng' // 模板不会改变
   }
   const state = reactive({
    age: 34
   })
   const ageRef = toRef(state, 'age')
   const { age } = toRefs(state)
   const s = toRefs(state)
   console.log('s===', s)
   const useToState = (options) => {
    return toRefs(options)
   }
   const { age: newAge } = useToState(state)
   console.log('newAge', newAge)
   const changeAge= () => {
    ageRef.value += 1
   }
   console.log(isProxy(ageRef))
   console.log(isReactive(state))
   const readState = readonly({
    name: 'zheng'
   })
   console.log('readState', readState)
//    readState.name = 'vv' // [Vue warn] Set operation on key "name" failed: target is readonly. {name: 'zheng'}
   console.log(readState.name) // zheng
</script>