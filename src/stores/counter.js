import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'meng'
  }),
  getters: {
    countAddOne: (state) => {
      return state.count + 1
    },
    countAddOnePlus() {
      return this.countAddOne + 1
    },
    countParams() {
      return () => this.countAddOnePlus * 2
    }
  },
  actions: {
    increment() {
      this.count += 1
    }
  }
})
