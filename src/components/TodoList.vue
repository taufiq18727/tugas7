<template>
    <div class="todo-list">
      <h1>Todo List</h1>
      <div class="input-container">
        <input v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task" />
        <button @click="addTask">Add</button>
      </div>
      <ul>
        <li v-for="(task, index) in tasks" :key="index" :class="{ done: task.done }">
          <div class="task-container">
            <input type="checkbox" :checked="task.done" @change="toggleTask(index)" />
            <span>{{ task.text }}</span>
          </div>
          <button class="remove" @click="removeTask(index)">x</button>
        </li>
      </ul>
      <p class="incomplete-tasks">Incomplete tasks: {{ incompleteTasks }}</p>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useTodoStore } from '../stores/todo';
  
  export default {
    setup() {
      const store = useTodoStore();
      const newTask = ref('');
  
      const addTask = () => {
        if (newTask.value.trim()) {
          store.addTask(newTask.value);
          newTask.value = '';
        }
      };
  
      const removeTask = (index) => {
        store.removeTask(index);
      };
  
      const toggleTask = (index) => {
        store.toggleTask(index);
      };
  
      const incompleteTasks = computed(() => store.incompleteTasks);
  
      return {
        newTask,
        tasks: store.tasks,
        addTask,
        removeTask,
        toggleTask,
        incompleteTasks
      };
    }
  };
  </script>
  
  <style>
  body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .todo-list {
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    transition: transform 0.3s ease;
  }
  
  .todo-list:hover {
    transform: scale(1.05);
  }
  
  h1 {
    font-size: 26px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
    letter-spacing: 1px;
  }
  
  .input-container {
    display: flex;
    margin-bottom: 20px;
  }
  
  input[type="text"] {
    flex: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-right: 10px;
    font-size: 16px;
    transition: border-color 0.3s ease;
  }
  
  input[type="text"]:focus {
    border-color: #007bff;
    outline: none;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 12px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #eee;
    background: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 10px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  li:hover {
    background-color: #f1f1f1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  li:last-child {
    border-bottom: none;
  }
  
  .task-container {
    display: flex;
    align-items: center;
  }
  
  input[type="checkbox"] {
    margin-right: 10px;
  }
  
  input[type="checkbox"]:checked + span {
    text-decoration: line-through;
    color: #999;
  }
  
  span {
    font-size: 16px;
    color: #333;
    transition: color 0.3s ease;
  }
  
  .done span {
    text-decoration: line-through;
    color: #999;
  }
  
  button.remove {
    background-color: #ff4d4d;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  button.remove:hover {
    background-color: #e60000;
    transform: scale(1.2);
  }
  
  .incomplete-tasks {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #666;
    font-style: italic;
  }
  </style>
  