<script>
  import { onMount } from "svelte";
  import axios from "axios";

  onMount(async () => {
    getQuestions();
    getAnswers();
  });
  let questionsArray = [];
  async function getQuestions() {
    questionsArray = [];
    try {
      let response = await axios.get("http://127.0.0.1:8080/api/questions/");
      questionsArray = response.data;
    } catch (error) {
      console.log(error);
    }
  }
  let answersArray = [];
  async function getAnswers() {
    answersArray = [];
    console.log("response");

    try {
      let response = await axios.get("http://127.0.0.1:8080/api/answers/");
      console.log(response);

      answersArray = response.data;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div class="mb-5 pb-5 container">
  <div class="row my-5">
    <div class="col-md-12 mx-auto text-center">
      <h1>
        FAQ : Foire aux questions <small> ({questionsArray.length}) </small>
      </h1>
      <p>
        Vous avez des questions ? On y répond ! Voici les questions les plus
        posées sur Yuccan Lead.
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12 mx-auto">
      <div class="accordion" id="accordionRental">
        {#each questionsArray.slice().reverse() as question}
       
          <div class="accordion-item mb-3">
            <h5 class="accordion-header" id="heading{question.id}">
              <button
                class="accordion-button border-bottom font-weight-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse{question.id}"
                aria-expanded="true"
                aria-controls="collapse{question.id}"
              >
                {question.question}
              </button>
            </h5>
            <div
              id="collapse{question.id}"
              class="accordion-collapse collapse"
              aria-labelledby="heading{question.id}"
              data-bs-parent="#accordionRental"
            >
              <ol>
                {#each answersArray.slice().reverse() as answer}
                {#if question.id == answer.question }
                  <li>
                    <div class="accordion-body text-sm opacity-8">
                      {answer.answer}
                    </div>
                  </li>
                  <hr />
                  {/if}
                {/each}
              </ol>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .accordion-button {
    background: -webkit-linear-gradient(
      to right,
      #eef3f7,
      #e5f0f9
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #eef3f7,
      #e5f0f9
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    box-shadow: 1px -12px 83px -5px #fdf5f5;
    color: black;
    font-weight: 500;
    min-height: 110px;
    font-size: 1em;
  }

  ol li {
    text-align: left;
  }
</style>
