<template>
  <div
    class="view login"
    v-if="state.username === '' || state.username === null"
  >
    <form v-on:submit.prevent="Login" class="login-form">
      <div class="form-inner">
        <h1>Login to Firechat</h1>
        <label for="username">Username</label>
        <input
          v-model="inputUsername"
          type="text"
          id="useername"
          placeholder="Please enter your  username"
        />
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>

  <div class="view chat" >
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>
    <section class="chat-box">
      <div
        v-for="message in state.messages"
        :key="message.key"
        :class="
          message.username === state.username
            ? 'message current-user'
            : 'message'
        "
      >
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>
    <footer>
      <form v-on:submit.prevent="sendMessage">
        <input
          type="text"
          v-model="inputMessage"
          placeholder="Write a message.. "
        />
        <input type="submit" value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
import writeMessage, { readMessages } from "@/helpers/dbActions";

export default {
  data() {
    return {
      inputUsername: "",
      inputMessage: "",
      state: {
        username: "",
        messages: [],
      },
    };
  },
  methods: {
    Login() {
      if (this.inputUsername !== "" || this.inputUsername !== null) {
        this.state.username = this.inputUsername
        this.inputUsername = ""
      }
    },

    Logout() {
      this.state.username = ""
    },
    sendMessage() {
      if (this.inputMessage === "" || this.inputMessage === null) return

      const message = {
        username: this.state.username,
        content: this.inputMessage,
      };

      writeMessage(message);
      this.inputMessage = ""
    },
  },

  mounted() {
    readMessages(this.state);
  },
};
</script>

<style lang="scss">
* {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #5f8be3;

  &.login {
    align-items: center;

    .login-form {
      display: block;
      width: 100%;
      padding: 15px;

      .form-inner {
        display: block;
        background-color: #fff;
        padding: 50px 15px;
        border-radius: 16px;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);

        h1 {
          color: #aaa;
          font-size: 28px;
          margin-bottom: 30px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          color: #aaa;
          font-size: 16px;
          transition: 0.4s;
        }

        input[type="text"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;

          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;

          color: #333;
          font-size: 18px;

          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;

          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;

          display: block;
          width: 100%;
          padding: 10px 15px;
          background-color: #b06afd;
          border-radius: 8px;

          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }

        &:focus-within {
          label {
            color: #7a5fe3;
            font-weight: 500;
          }

          input[type="text"] {
            background-color: #fff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);

            &::placeholder {
              color: #666;
            }
          }
        }
      }
    }
  }

  &.chat {

    flex-direction: column;

    header {
      position: relative;
      display: flex;
      width: 100%;
      padding: 50px 30px 10px;

      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: #FFF;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;

      }

      h1 {
        color: #FFF;
      }

    }

    .chat-box {
      border-radius: 24px 24px  0px  0px;
      background-color: #FFF;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;

      .message {
        display: flex;
        margin-bottom: 15px;
        .message-inner {
          .username{
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .content{
            display: inline-block;
            padding: 10px 20px;
            background-color: #F3F3F3;
            border-radius: 999px;

            color: #333;
            font-size: 18px;
            line-height: 1.2rem;
            text-align: left;

          }
        }

        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;

          .message-inner{
            max-width: 75%;

            .content {
              color: #FFF;
              font-weight: 600;
              background-color: #757EFA;
            }

            
          }
        }

      }
    }

  }

  footer {
    position: sticky;
    bottom: 0px;
    background-color: #FFF;
    padding: 30px;
    box-shadow: 0px 0px 12px rgba( 100, 100, 100, 0.2);

    form {
      display: flex;

      input[type="text"] {
        flex: 1 1 100%;

        appearance: none;
        border: none;
        outline: none;
        background: none;

        display: block;
        width: 100%;
        padding: 10px 15px;
        border-radius: 8px 0px 0px 8px;

        color: #333;
        font-size: 18px;

        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
        background-color: #f3f3f3de;

        transition: 00.4s;

        &::placeholder {
          color: #888;
          transition: 0.4s;
        }
      }

      input[type="submit"] {
        appearance: none;
        border: none;
        outline: none;
        background: none;


        display: block;
        padding: 10px 15px;
        border-radius: 0px 8px 8px 0px;

        background-color: #B06AFD;

        color: #FFF;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }

}
</style>
