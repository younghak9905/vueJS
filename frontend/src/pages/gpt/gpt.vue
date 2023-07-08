<template>
  <div class="container">
    <div class="chat-room-container">
      <h1>Chat Room</h1>
      <ul>
        <li v-for="(chat, index) in chatRooms" :key="index" @click="selectChatRoom(chat.chatNum)" :class="{'selected': chat.chatNum === selectedChatRoom}">
          Chat Room {{ chat.chatNum }}
        </li>
      </ul>
    </div>

    <div class="page-container">
      <div class="gpt-page">
        <div :class="{'chat-container' : chatLog}">
          <div class="chat">
            <div v-for="chatLog in chatLog" :key="chatLog.chatNum">
              <p v-if="chatLog" class="user-message">{{ chatLog.prompt }}</p>
              <p v-if="chatLog" class="assistant-message">{{ chatLog.content }}</p>
            </div>
          </div>
          <div v-for="message in messages" :key="message.id" :class="{'user-message': message.isUser, 'assistant-message': !message.isUser}">
            {{ message.content }}
          </div>
        </div>

        <div class="input-container">
          <input type="text" v-model="content" class="input-field">

          <div class="radio-buttons">
            <label>
              <input type="radio" v-model="isUsed" value="true"> True
            </label>
            <label>
              <input type="radio" v-model="isUsed" value="false"> False
            </label>
          </div>
          <button @click="sendMessage" class="send-button">Send</button>
        </div>
      </div>
    </div>
    <div class="empty-space"></div>
  </div>


</template>

<script>
import axios from 'axios';

export default {
  name: 'gptPage',
  data() {
    return {
      content: '',
      result: '',
      isUsed: false,
      chatLog: [],
      messages: [],
      chatRooms: [
        { chatNum: 1 },
        { chatNum: 2 },
        { chatNum: 3 }
        // Add more chat rooms as needed
      ],
      selectedChatRoom: 1,
    };
  },

  mounted() {
    this.getMessage()
  },
  methods: {
    sendMessage() {
      // Add user message to the messages array
      this.messages.push({
        id: this.messages.length + 1,
        isUser: true,
        content: this.content
      });

      // Send the message to the server
      axios
          .post(`/chatGPT?isUsed=${this.isUsed}&chatRoomNum=${this.selectedChatRoom}`, {

            content: this.content

          })
          .then(response => {
            // Add assistant response to the messages array
            this.messages.push({
              id: this.messages.length + 1,
              isUser: false,
              content: response.data.data.response
            });
            this.result = response.data.data.response;
          })
          .catch(error => {
            console.log(error);
          });

      // Clear the input field
      this.content = '';
    },

    getMessage(){
      axios.get(`/chatGPT/view/${this.selectedChatRoom}`)

          .then(response => {

            this.chatLog = response.data.data.chatGPTList;
            console.log(this.chatLog);
          })
          .catch(error => {
            console.error(error);
            console.log(this.selectedChatRoom)
          });
    },
    selectChatRoom(chatNum) {
      this.selectedChatRoom = chatNum;
      this.getMessage();
      console.log(this.selectedChatRoom);

    },
  }

};
</script>

<style>
.container {
  display: flex;
}
.empty-space {
  flex: 1;
  /* Empty space styles */
}
.chat-room-container {
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20%;
  max-width: 200px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-right: 20px;
}


.page-container {
  flex: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;



}

.gpt-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  border-radius: 5px;
  overflow-y: auto;
  margin-left: -40px;
}

.gpt-page .chat-container {
  padding: 20px;
  background-color: #f0f0f0;
}

.gpt-page .input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  height: 80px;
  background-color: #f0f0f0;
  padding: 20px;
}

.input-field {
  flex: 1;
  width: 100%;
  height: 40px;
  font-size: 14px;
  padding: 5px;
}
.selected{
  background-color: #e0e0e0;
}
.user-message{
  background-color:lightblue;
  padding:5px;
  margin-bottom:5px;
}

.assistant-message{
  background-color:lightgreen;
  padding:5px;
  margin-bottom:5px;
}


/* Rest of the styles... */


</style>
