<template>
  <div id="app">
    <div class="container">
      <h1>To-Do List</h1>
      <div>
        <input type="text" placeholder="Enter a to-do" v-model="message" @keypress.enter="All()"/>
        <button class="btn-add" @click="All()">ADD</button>
        <button class="btn-deleteAll" @click="DeleteAll()">Delete All</button>
      </div>
      <list-to-do v-bind:messages = "messages"/>
    </div>
  </div>
</template>

<script>
import ListToDo from '../src/components/ListToDo.vue'

export default {
  name: 'App',
  components: {
    ListToDo 
  }, 
  data(){
    return {
      message: '',
      messages: [],
    }
  },
  methods: {
    AddTodo()
    {
      if (this.message){
        this.messages.push({content: this.message, done: false, isEditing: false, newText: ""});
        this.message = '';
      }
      else
      {
        alert("Không được để trống!!!")
      }
    },
    saveData() {
      if (this.messages) {
        // Lưu dữ liệu vào localStorage với khóa là "data" và chuyển đổi thành chuỗi JSON
        localStorage.setItem("messageSave", JSON.stringify(this.messages));
        this.message = "";
      }
    },
    All(){
      addEventListener("click", this.AddTodo());
      addEventListener("click", this.saveData());
    },
    DeleteAll()
    {
      if(confirm("ban co dong y xoa tat ca khong?"))
      {
        this.messages.splice(0,this.messages.length);
        localStorage.setItem("messageSave", JSON.stringify(this.messages));
      }
    }
  },
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.container{
  width: 50rem;
  height: auto;
  background: aqua;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container input
{
  width: 35rem;
  height: 3rem;
  resize: none;
  outline: none;
}
.container div
{
  display: flex;
}

button:hover
{
  color: red;
  background: aqua;
}
</style>
