<template>
  <div>
    <p>My Peer Id : {{ myPeerId }}</p>
    <p>Remote Peer Id
      <input v-model="remotePeerId">
    </p>
    <p button @click="connect()">Connect to my friend!</p>
    <form>
      <label>Message To Send:</label>
      <input v-model="message" type="text">
    </form>
    <p button @click="sendMessage()">Send Message!</p>
    <hr>
    <div class="col-xs-12 col-sm-6">
      <ul class="list-group">
        <li class="list-group-item" v-for="message in messages">Message: {{ message }}</li>      
      </ul>
    </div> 
  </div>
</template>

<script>
    import Peer from 'peerjs';

    export default {
      data: () => ({
        connection: null,
        connecting: true,
        message: '',
        messages: [],
        myPeer: null,
        myPeerId: '',
        remotePeerId: ''
      }),
      created() {
        this.myPeerId = (Math.random() * 6 + Math.random()).toString(36).replace('.', '');
        this.myPeer = new Peer({ key: 'lwjd5qra8257b9' })
        this.myPeer.on('open', id => {
          console.log('Connected at PeerJS server with success')
          this.myPeerId = id;
          this.connecting = false
        })
        this.myPeer.on('connection', con => {
          this.connection = con
          con.on('open', () => {
            con.on('data', newMessage => this.messages.push(newMessage))
          })
        })
      },
      computed: {
      },
      methods: {
        connect() {
          if (this.remotePeerId.trim().length) {
            this.connection = this.myPeer.connect(this.remotePeerId)
            this.connection.on('open', () => {
              this.connection.on('data', newMessage => this.messages.push(newMessage))
            })
          }
        },
        sendMessage() {
          const newMessage = {
            id: this.myPeerId,
            message: this.message
          }
          if (this.connection) {
            this.connection.send(newMessage)
          }
          this.messages.push(newMessage)
          this.message = ''
        }
      },
      filters: {
      }
    }
</script>
