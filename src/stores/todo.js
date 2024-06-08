import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: []
  }),
  actions: {
    addTask(task) {
      this.tasks.push({ text: task, done: false });
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    toggleTask(index) {
      this.tasks[index].done = !this.tasks[index].done;
    }
  },
  getters: {
    incompleteTasks: (state) => state.tasks.filter(task => !task.done).length
  }
});
