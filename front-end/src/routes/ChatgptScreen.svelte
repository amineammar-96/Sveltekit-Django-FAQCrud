<script>
  import { writable } from "svelte/store";

  import axios from "axios";
  let messageChat = "";
  let messageChatAux = "";
  let chatResponses = writable([]);

  const chatgptAiUrl = "https://api.openai.com/v1/engines/davinci/completions";
  const apiKey = "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";

  async function sendChatGptRequestion(e) {
    messageChatAux = messageChat;
    messageChat = "";
    e.preventDefault();
    if (messageChatAux.trim() === "") {
      return;
    }

    chatResponses.update((responses) => [
      ...responses,
      `Vous: ${messageChatAux}\n`,
    ]);

    const response = await axios.post(
      chatgptAiUrl,
      {
        prompt: `Q: ${messageChatAux}\nA:`,
        max_tokens: 60,
        n: 1,
        stop: ["\n"],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const answer = response.data.choices[0].text.trim();
    chatResponses.update((responses) => [...responses, `Robot: ${answer}\n`]);
    messageChatAux = "";
  }
</script>

<section class="chatboxContainer">
  <div class="">
    <div class="row m-0 p-0">
      <div class="col-12 m-0 p-0">
        <div class="chatboxAux">
          <div class="chatbox">
            <div class="">
              <div class="modal-content">
                <div class="chatBoxHead">
                  <div class="row">
                    <div class="col-12">
                      <div class="">
                        <span class="chat-icon"
                          ><img
                            class="img-fluid"
                            src="assets/images/chatgpt.png"
                            alt="imagemmmmeere"
                          /></span
                        >
                       
                        <div class="flex-grow-1 ms-3">
                          <h3>
                            Améliorez l'expérience utilisateur et réduisez la
                            charge de travail de votre équipe de support grâce à
                            ChatGPT sur votre site Web FAQ
                          </h3>
                          <p>Améliorez votre FAQ avec ChatGPT API</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="chatboxBody">
                  <div class="chatboxBodyAux">
                    {#if $chatResponses.length > 0}
                      <ul>
                        {#each $chatResponses as response}
                          {#if response.startsWith("Vous:")}
                            <li class="request">
                              <p>{response}</p>
                              <span>10:38</span>
                            </li>
                          {:else}
                            <li class="response">
                              <p>{response}</p>
                              <span>10:38</span>
                            </li>
                          {/if}
                        {/each}
                      </ul>
                    {:else}
                      <ul>
                        <li>
                          <h5 class="text-dark">
                            Obtenir des réponses rapides et précises avec
                            ChatGPT
                          </h5>
                        </li>
                      </ul>
                    {/if}
                  </div>
                </div>

                <div class="inputChatBox">
                  <form on:submit={sendChatGptRequestion}>
                    <input
                      bind:value={messageChat}
                      type="text"
                      class="form-control"
                      aria-label="message…"
                      placeholder="Veuillez écrire votre demande ici"
                    />

                    <button type="submit"
                      ><i
                        class="fa fa-paper-plane"
                        aria-hidden="true"
                      />Envoyer</button
                    >
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- chatbox -->
      </div>
    </div>
  </div>
</section>

<style>


  .chatboxContainer {
    height: 100%;
    padding: 0;
    background: #ffffff;
  }

  .chatboxAux {
    position: relative;
    width: 100%;
    background-color: #fff;
    border-radius: 0.3rem;
    height: 100%;
    overflow: hidden;
    min-height: calc(100% - 1rem);
  }

  .chatbox {
    width: auto;
    overflow: hidden;
    height: 100%;
    border-left: 1px solid #ccc;
    min-height: 100vh;
  }

  .chatbox img {
    width: 70px;
    margin-bottom: 20px;
  }

  .chatboxAux .form-control {
    display: block;
    width: 80%;
    padding: 0.375rem 0.75rem;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: #222;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ccc;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .chatboxAux .form-control:focus {
    outline: 0;
    box-shadow: inherit;
  }

  .chatBoxHead h3 {
    color: #222;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 0;
  }

  .chatBoxHead p {
    color: #343434;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .chatBoxHead {
    padding: 45px;
    border-bottom: 1px solid #ccc;
  }

  .chatboxBodyAux ul {
    overflow: hidden;
    padding: 0 30px;
    height: 580px;
    overflow: scroll;
  }

  .chatboxBodyAux ul li {
    list-style: none;
    margin: 15px 0;
  }

  .chatboxBodyAux ul li.request {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    text-align: left;
    padding: 0;
    margin: 10px 0;
  }

  .chatboxBodyAux ul li.request p {
    color: #000;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    padding: 15px;
    background: #f5f5f5;
    display: inline-block;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-bottom: 0;
  }

  .chatboxBodyAux ul li.response {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    text-align: left;
    padding: 0;
    margin: 10px 0;
  }

  .chatboxBodyAux ul li.response p {
    color: #141414;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    padding: 15px;
    background: #4b7bec25;
    display: inline-block;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-bottom: 0;
  }

  .chatboxBodyAux ul li.response:after {
    display: block;
    content: "";
    clear: both;
  }

  .inputChatBox {
    padding: 15px;
    border-top: 1px solid #ccc;
  }

  .inputChatBox form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .inputChatBox .form-control {
    display: block;
    width: 85%;
    padding: 0.375rem 0.75rem;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: #222;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ccc;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    height: 57px;
  }

  .inputChatBox button {
    border: none;
    background: #171718;
    padding: 0.875rem 15px;
    color: #fff;
    border-radius: 0.25rem;
    font-size: 18px;
    font-weight: 600;
    width: 24%;
    margin-left: 1%;
  }

  .inputChatBox button i {
    margin-right: 5px;
  }


  button:focus {
    outline: 0;
  }


  @media (max-width: 767px) {
    .chat-icon {
      display: block;
      margin-right: 5px;
    }

    .chatbox {
      width: 100%;
      position: absolute;
      left: 1000px;
      right: 0;
      background: #fff;
      transition: all 0.5s ease;
      border-left: none;
    }
    
    .chatBoxHead h3 {
      font-size: 14px;
    }
    .chatBoxHead p {
      font-size: 12px;
    }
    .chatBoxHead .flex-shrink-0 img {
      height: 30px;
    }
    .inputChatBox button {
      width: 28%;
    }
    .inputChatBox .form-control {
      width: 70%;
    }
    .chatboxBodyAux ul li.request p {
      font-size: 13px;
      padding: 8px;
      border-bottom-left-radius: 6px;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    .chatboxBodyAux ul li.response p {
      font-size: 13px;
      padding: 8px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      border-bottom-left-radius: 6px;
    }
  }

  .chatboxBodyAux span {
    padding: 5px 0;
    text-align: right;
    font-size: 14px;
  }
</style>
