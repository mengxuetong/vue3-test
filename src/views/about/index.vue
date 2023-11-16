<template>
    <div class="about">
      <h1>This is an about page</h1>
      <p>新增加的内容{{ count }}</p>
      <button @click="addCount">add count</button>
      <!-- <p>computed: count + 1 = {{ countAdd }}</p> -->
      <p>computed set: countSet ++ {{ countSet }}</p>
      <p><button @click="addComputed">add computed</button></p>
      <h3>reactive 状态:</h3>
      <p>name:{{ aboutState.name }}, age: {{ aboutState.age }}</p>
      <button @click="changeState">add count</button>
      <div>
        子组件：
        <you-comm :v="v" :v2="v2" ref="child" data-uid="33445566" data-name="meng" :list-data="contents">
          <template #list="{params}">
            <h4>title: {{ params.title }}</h4>
            <p>label: {{ params.label }}</p>
            <p>content: {{ params.content }}</p>
          </template>
        </you-comm>
        <button @click="changeChild">改变子组件的值</button>
      </div>
      <h4>readonly 只读属性</h4>
      <div>姓名：{{ read.name }}， 年龄：{{ read.age }}</div>
    </div>
  </template>
  <script setup>
  import { ref, reactive, getCurrentInstance, computed, readonly } from 'vue';
  import YouComm from '../../components/YouComponent.vue';
  /**
   * ref reactive 的使用
   */
  const count = ref(0)
  const addCount = () => {
    count.value +=1
  }
  const aboutState = reactive({
    name: 'meng',
    age: 34
  })
  const changeState = () => {
    if (aboutState.name === 'meng') {
      aboutState.name = 'zheng'
      aboutState.age = 33
    } else {
      aboutState.name = 'meng'
      aboutState.age = 34
    }
  }
  const v = ref(0), v2=ref(0)
  
  // 子组件引用，与 ref 值同名的变量引用
  const child = ref(null) // 方式一
  const { proxy } = getCurrentInstance() // 方式二
  const currentIns = getCurrentInstance()
  const changeChild = () => {
    v.value +=1
    v2.value +=2
    // child.value.add() // 第一种方式
    // proxy.$refs['child'].add() // 第二种方式
    currentIns.refs['child'].add() // 第二种方式
  }
  
  // slot slot-scope 使用
  const contents = reactive([
    {
      title: 'tt1',
      label: '1',
      content: 'title content 1'
    },
    {
      title: 'tt2',
      label: '2',
      content: 'title content 2'
    },
    {
      title: 'tt3',
      label: '3',
      content: 'title content 3'
    },
    {
      title: 'tt4',
      label: '4',
      content: 'title content 4'
    },
    {
      title: 'tt5',
      label: '5',
      content: 'title content 5'
    },
    {
      title: 'tt6',
      label: '6',
      content: 'title content 6'
    }
  ])
  // computed 使用
  const k = ref(0)
  const countAdd = computed(() => k.value + 1)
  const countSet = computed({
    get: () => k.value + 1,
    set: (val) => {
      k.value = val + 1
    }
  })
  const addComputed = () => {
    // k.value += 1
    countSet.value ++
  }
  const read = readonly({
    name: 'Meng',
    age: 34
  })
  </script>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  