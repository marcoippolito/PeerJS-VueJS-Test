<template>
  <div>
    <p>My Peer Id : {{ this.myPeer.id }}</p>
    <hr>
    <p>Remote Peer Id
      <input v-model="remotePeerId">
      <button @click="connect()">Connect</button>
    </p>
    <hr>
    <p>Message to send
      <input v-model="message">
      <button @click="sendMessage()">Send</button>
    <hr>
    <div class="col-xs-12 col-sm-6">
      <h3>Messages Flow:</h3>
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
        message: '',
        messages: [],
        myPeer: null,
        myPeerId: '',
        remotePeerId: ''
      }),
      created() {
        this.myPeer = new Peer()
        this.myPeer.on('open', (id) => {
          console.log('this.myPeer.id: ' + this.myPeer.id + ' this.myPeer.key: ' + this.myPeer.key)
        })
        // Receive messages
        this.myPeer.on('connection', con => {
          console.log("Receiving messages from peer")
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
          this.connection = this.myPeer.connect(this.remotePeerId)
          console.log('Now connected: ', this.connection)
          // Receive messages:
          this.connection.on('open', () => {
            this.connection.on('data', newMessage => this.messages.push(newMessage))
          });
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
