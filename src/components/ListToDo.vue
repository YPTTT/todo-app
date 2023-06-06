<template>
  <div class="ToDoApp">
    <ul>
      <li v-for="(mess, index) in messages" v-bind:key="index">
        <div>
            <input type="checkbox" v-model="mess.done">
            <span :class="{done: mess.done}" v-if="!mess.isEditing">{{ mess.content }}</span>
        </div>
        <input class="inputText" type="text" v-model="mess.newText" v-if="mess.isEditing" @keyup.enter="Edit(index)">
        <div>
            <button @click="toggleEdit(index)" v-if="!mess.isEditing">Edit</button>
            <button @click="toggleEdit(index)" v-else>Cancel</button>
            <button @click="Delete(index)">DELETE</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ListToDo",
  data() {
    return {
      subMessages: this.messages,
    };
  },
  props: {
    messages: {
      type: Array,
      default: () => {
        [];
      },
    },
  },
  methods: {
    Edit(index) {
      const newText = this.subMessages[index].newText;
      if (newText) {
        this.subMessages[index].content = newText;
        this.subMessages[index].newText = "";
      }
      this.subMessages[index].isEditing = false;
      if (this.subMessages) {
        // Lưu dữ liệu vào localStorage với khóa là "data" và chuyển đổi thành chuỗi JSON
        localStorage.setItem("messageSave", JSON.stringify(this.subMessages));
        this.message = "";
      }
    },
    toggleEdit(index) {
      this.subMessages[index].isEditing = !this.subMessages[index].isEditing;
      if (this.subMessages[index].isEditing) {
        this.subMessages[index].newText = this.subMessages[index].content;
      }
    },
    Delete(index) {
      if(confirm("ban co dong y xoa?"))
      {
        this.subMessages.splice(index, 1);
        localStorage.setItem("messageSave", JSON.stringify(this.subMessages));
      }
    },
    mount(){
      console.log(JSON.parse(localStorage.getItem("messageSave")));
    }
  },
};
</script>

<style scoped>

.ToDoApp ul {
  width: 43rem;
  list-style: none;
  background: aquamarine;
  margin: 2rem;
  padding: 0;
}

li {
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  background: white;
  padding: 0 1rem 0 1rem;
}

button {
  border: none;
  border-radius: 4px;
  margin-right: 0.5rem;
}

button:hover {
  background: aqua;
  color: red;
}

.inputText
{
    width: 28rem;
    outline: none;
    border: none;
    background: rgb(230, 221, 221);
}

span
{
  width: 28rem;
}
.done {
  text-decoration: line-through;
  color: gray;
}
</style>