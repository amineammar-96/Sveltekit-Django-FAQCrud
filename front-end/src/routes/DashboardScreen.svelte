<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import Swal from "sweetalert2";
  import "bootstrap/dist/js/bootstrap.bundle.min.js";
  import { format } from "date-fns";

  let is_admin = localStorage.getItem("is_admin");
  let email = localStorage.getItem("useremail");

  import { navigate } from "svelte-routing";
  onMount(async () => {
    getQuestions();
    getAnswers();
    const token = localStorage.getItem("token");
    if (token === null || token.trim() === "") {
      navigate("/");
      if (is_admin == true) {
      } else {
      }
    }
  });

  function signout(event) {
    let timerInterval;
    Swal.fire({
      title: "Chargement...",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("useremail");
    localStorage.removeItem("user_id");
  }

  let title = "";
  let subject = "";
  let question = "";
  
  async function addQuestion(event) {
    if (title.trim().length < 4 || title == "") {
      Swal.fire({
        icon: "error",
        title: "Veuillez vérifier les informations saisies",
        text: "Titre : 3 caractéres minimum",
        showCancelButton: false,
        confirmButtonColor: "#132d79",
        confirmButtonText: "Compris !",
        closeOnConfirm: true,
      });
    } else if (title.trim().length < 4 || title == "") {
      Swal.fire({
        icon: "error",
        title: "Veuillez vérifier les informations saisies",
        text: "Titre : 3 caractéres minimum",
        showCancelButton: false,
        confirmButtonColor: "#132d79",
        confirmButtonText: "Compris !",
        closeOnConfirm: true,
      });
    } else if (subject == "") {
      Swal.fire({
        icon: "error",
        title: "Sujet non selectionné",
        showCancelButton: false,
        confirmButtonColor: "#132d79",
        confirmButtonText: "Compris !",
        closeOnConfirm: true,
      });
    } else if (question == "" || question.trim().length < 10) {
      Swal.fire({
        icon: "error",
        title: "Question : 10 caractéres minimum",
        showCancelButton: false,
        confirmButtonColor: "#132d79",
        confirmButtonText: "Compris !",
        closeOnConfirm: true,
      });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/question/add",
          {
            title: title,
            subject: subject,
            question: question,
            user_id: localStorage.getItem("user_id"),
          }
        );
        Swal.fire({
          icon: "success",
          text: "Votre question à été bien ajoutée à notre plateforme",
          showCancelButton: false,
          confirmButtonColor: "black",
          confirmButtonText: "Fermer !",
          closeOnConfirm: true,
        });
        title = "";
        question = "";
        subject = "";
        getQuestions();
      } catch (error) {
        console.log(error);
      }
    }
  }

  let questionsArray = [];
  async function getQuestions() {
    questionsArray = [];
    try {
      let response = await axios.get("http://localhost:8080/api/questions/");

      // response.data.forEach(element => {
      //     questionsArray.push(element);
      // });

      questionsArray = response.data;
    } catch (error) {}
  }

  async function deleteQuestion(id) {
    console.log(id);

    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Attention, si vous appuyez sur ce bouton, les modifications seront définitives. Vous ne pourrez pas annuler cela !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "black",
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      try {
        let response = axios.delete(
          "http://localhost:8080/api/question/delete/" + id
        );
        console.log(response);
        if (result.isConfirmed) {
          Swal.fire({
            title: "Suppression réussie !",
            text: "La question a été supprimée",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "black",
            confirmButtonText: "YuccanLead FAQ",
          });
          getQuestions();
        }
      } catch (error) {
        console.log("error");
      }
    });
  }

  let updateQuestionState = false;
  let questionIdToUpdate = 0;
  async function getQuestionDetailsToUpdate(id) {
    updateQuestionState = true;
    questionIdToUpdate = id;
    try {
      let response = await axios.get(
        "http://localhost:8080/api/question/" + id
      );
      title = response.data.data.title;
      subject = response.data.data.subject;
      question = response.data.data.question;
      console.log(response.data.data);
    } catch (error) {}
  }

  async function updateQuestion() {
    try {
      let response = await axios.put(
        "http://localhost:8080/api/question/update/" + questionIdToUpdate,
        {
          title: title,
          subject: subject,
          question: question,
        }
      );

      getQuestions();
    } catch (error) {}
  }

  let answer = "";
  var questionIdToResponse = 0;

  function questionIdToResponseChange(id) {
    questionIdToResponse = id;
    console.log(questionIdToResponse);
  }

  async function addAnswer() {
    try {
      let response = await axios.post("http://localhost:8080/api/answer/add", {
        answer: answer,
        user_id: localStorage.getItem("user_id"),
        question: questionIdToResponse,
      });

      Swal.fire({
        icon: "success",
        text: "Votre réponse à été bien ajoutée à notre plateforme",
        showCancelButton: false,
        confirmButtonColor: "black",
        confirmButtonText: "Fermer !",
        closeOnConfirm: true,
      });

      getAnswers();
      getQuestions();

      answer = "";

      console.log(response);
    } catch (error) {}
  }

  let answersArray = [];
  async function getAnswers() {
    answersArray = [];
    try {
      let response = await axios.get("http://localhost:8080/api/answers/");
      answersArray = response.data;
      console.log(typeof answersArray, typeof response);
    } catch (error) {}
  }

  function countAnswersQuestion(id) {
    let count = 0;
    answersArray.forEach((element) => {
      if (element.question == id) {
        count++;
      }
    });

    return count;
  }
</script>

<div class="navbar-top">
  <ul>
    <li>
      <a href="/" on:click={signout}>
        <i class="fa fa-sign-out-alt fa-2x" />
      </a>
    </li>
  </ul>
</div>

<div class="gridDashboard">
  <div class="sidenav">
    <div class="profile">
      <img src="assets/images/avatar.png" alt="" width="100" height="100" />

      <div class="name">{email}</div>
      <div class="name">{is_admin ? "Admin" : "Client"}</div>
    </div>

    <div class="sidenav-url">
      <div class="url">
        <a href="#profile" class="active">YuccanLead FAQ</a>
      </div>

      <div class="url">
        <a
          href=""
          on:click={(updateQuestionState = false)}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          class="active2">Publier une question</a
        >
      </div>
    </div>
  </div>

  <div class="main">
    <div class="container">
      <div class="row my-5">
        <div class="col-md-12 mx-auto text-center">
          <h2>Questions publiées ({questionsArray.length})</h2>
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
                  <div class="gridAnswersHeader">
                    <div class="answerCountDiv">
                      <span
                        >Publiée le {format(
                          new Date(question.updated_at),
                          "dd/mm/yyyy hh:ii"
                        )}</span
                      >
                      <span>{countAnswersQuestion(question.id)} Réponse(s)</span
                      >
                    </div>
                    <div class="flexBtns">
                      <div class="deleteBtn">
                        <i
                          class="fa-solid fa-trash"
                          on:keydown={deleteQuestion(question.id)}
                          on:click={deleteQuestion(question.id)}
                        />
                      </div>
                      <div class="editBtn">
                        <i
                          class="fa-solid fa-pen-nib"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          on:keydown={getQuestionDetailsToUpdate(question.id)}
                          on:click={getQuestionDetailsToUpdate(question.id)}
                        />
                      </div>
                      <div class="answerBtn">
                        <i
                          data-bs-toggle="modal"
                          data-bs-target="#answerModal"
                          on:click={questionIdToResponseChange(question.id)}
                          on:keydown={questionIdToResponseChange(question.id)}
                          class="fa-solid fa-reply"
                        />
                      </div>
                    </div>
                  </div>
                </h5>
                <div
                  id="collapse{question.id}"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading{question.id}"
                  data-bs-parent="#accordionRental"
                >
                  <ol>
                    {#each answersArray as answer}
                      {#if answer.question == question.id}
                        <li>
                          <div class="accordion-body opacity-8">
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
  </div>
</div>

<!-- Modal -->
<div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        {#if !updateQuestionState}
          <h5 class="modal-title" id="exampleModalLabel">
            Ajouter une nouvelle question pour notre communauté
          </h5>
        {:else}
          <h5 class="modal-title" id="exampleModalLabel">
            Modifier la question ( L'ID : <small>
              YCLD {questionIdToUpdate}
            </small> )
          </h5>
        {/if}
      </div>
      <form class="pad-bg">
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col">
                {#if !updateQuestionState}
                  <h1 class="text-center">Question du jour</h1>
                {/if}
                <div class="form-group">
                  <label for="">Titre</label>
                  <input
                    type="text"
                    placeholder="Ex: Système de parrainage"
                    class="i-box form-control input-lg"
                    required
                    bind:value={title}
                  />
                </div>
                <div class="form-group">
                  <label for="">Sujet</label>
                  <select
                    bind:value={subject}
                    required
                    class="form-control input-lg"
                  >
                    <option value="" selected disabled
                      >Veuillez choisir un sujet</option
                    >

                    <option value="service">Service</option>
                    <option value="sav">SAV</option>
                    <option value="assistance">Assistance</option>
                    <option value="remboursement">Remboursement</option>
                    <option value="renseignement">Renseignement</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="">Question ?</label>
                  <textarea
                    row="5"
                    class="form-control input-lg"
                    type="text"
                    placeholder="Ex: Comment puis-je effectuer un don à une organisation caritative via Yuccan Lead ? .."
                    bind:value={question}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn1" data-bs-dismiss="modal"
            >Annuler</button
          >
          {#if !updateQuestionState}
            <button on:click={addQuestion} type="button" class="btn btn2"
              >Publier</button
            >
          {:else}
            <button on:click={updateQuestion} type="button" class="btn btn2"
              >Modifier</button
            >
          {/if}
        </div>
      </form>
    </div>
  </div>
</div>

<div
  class="modal fade"
  id="answerModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="answerModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="answerModalLabel">
          Ajouter une réponse ( L'ID : <small>
            YCLD {questionIdToUpdate}
          </small> )
        </h5>
      </div>
      <form class="pad-bg">
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="">Réponse : </label>
                  <textarea
                    rows="5"
                    required
                    type="text"
                    placeholder="...."
                    class="form-control input-lg"
                    bind:value={answer}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn1" data-bs-dismiss="modal"
            >Annuler</button
          >

          <button
            on:click={addAnswer(question.id)}
            type="button"
            class="btn btn2">Ajouter la réponse</button
          >
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  @import "bootstrap/dist/css/bootstrap.min.css";

  .navbar-top {
    background-color: #fff;
    color: #333;
    height: 70px;
  }

  .navbar-top ul {
    float: right;
    list-style-type: none;
    margin: 0;
    overflow: hidden;
    padding: 18px 50px 0 40px;
  }

  .navbar-top ul li {
    float: left;
  }

  .navbar-top ul li a {
    color: #333;
    padding: 14px 16px;
    text-align: center;
    text-decoration: none;
  }

  .sidenav {
    background-color: #fff;
    color: #333;
    border-bottom-right-radius: 25px;
    height: 86%;
    left: 0;
    overflow-x: hidden;
    top: 70px;
    width: 100%;
    padding-top: 5%;
  }

  .profile {
    margin-bottom: 20px;
    margin-top: -12px;
    text-align: center;
  }

  .profile img {
    box-shadow: 0px 0px 5px 1px rgb(255, 254, 254);
    width: 30%;
    height: 30%;
  }

  .name {
    font-size: 20px;
    font-weight: bold;
    padding-top: 20px;
  }

  .url,
  hr {
    text-align: center;
  }

  .url a {
    color: #818181;
    display: block;
    font-size: 20px;
    margin: 10px 0;
    padding: 6px 8px;
    text-decoration: none;
  }

  .url a.active:hover,
  .url .active {
    background-color: #000000;
    border-radius: 28px;
    color: #ffffff;
    margin-left: 14%;
    width: 65%;
  }

  .url a.active2:hover,
  .url .active2 {
    background-color: #eef3f7;
    border-radius: 28px;
    color: #000000;
    margin-left: 14%;
    width: 65%;
    font-weight: bold;
    padding: 10px 20px;
  }

  .main {
    font-size: 28px;
    padding: 0 10px;
    width: 95%;
  }

  .main h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .gridDashboard {
    display: grid;
    grid-template-columns: 30% 70%;
    min-height: 400px;
  }

  .pad-bg {
    background: #ffffff;
    padding: 0px 20px;
    border-radius: 5px;
    min-height: 500px;
    border: 1px solid #f5f5f5;
  }

  .form-group {
    width: 100%;
    padding: 20px 0;
    text-align: left;
  }
  .pad-bg h1 {
    padding-bottom: 10px;
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 1px;
    border-bottom: 1px dashed #f2f1f1;
  }

  .pad-bg label {
    margin-bottom: 10px;
    border-bottom: 1px dashed #f2f1f1;
  }

  .btn2 {
    background-color: #3085d6;
    color: white;
  }

  .btn1 {
    background-color: #161717;
    color: white;
  }

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

    color: rgb(0, 0, 0);
    font-weight: 600;
    outline: none;

    font-weight: 500;
    min-height: 70px;
    font-size: 0.8em;
  }

  .deleteBtn i {
    font-size: 1.5rem;
    color: rgb(251, 30, 30);
    cursor: pointer;
  }

  .flexBtns {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .answerCountDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .answerCountDiv span {
    padding: 0 20px;
    color: gray;
    font-size: 0.9rem;
    width: 100%;
    text-align: left;
    padding-bottom: 5px;
  }

  .gridAnswersHeader {
    display: flex;
    justify-content: space-between;
  }

  .deleteBtn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px;
  }

  .editBtn,
  .answerBtn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px;
    padding-left: 0;
  }

  .answerBtn i {
    font-size: 1.5rem;
    color: #132d79;
    cursor: pointer;
  }

  .editBtn i {
    font-size: 1.5rem;
    color: #1c92d2;
    cursor: pointer;
  }

  .accordion ol li {
    text-align: left;
    font-size: 1rem;
  }

  .accordion-body {
    font-size: 1.2rem;
  }

  .accordion-button::after {
    background-image: white;
  }

  #answerModal .pad-bg {
    min-height: 150px;
  }
</style>
