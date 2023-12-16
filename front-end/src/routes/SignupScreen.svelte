<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import Swal from "sweetalert2";
  let email = "amineammar20@icloud.com";
  let password = "azertyui";
  let password_confirmation = "azertyui";
  let loggedIn = false;


  import { navigate } from 'svelte-routing';
  onMount(() => {
    const token = localStorage.getItem("token");
    if (token === null || token.trim() === "") {
      loggedIn = true;
    } else {
      navigate("/");
    }
  });


  async function signup(event) {
    event.preventDefault();

    if (password != password_confirmation) {
      Swal.fire({
        icon: "error",
        title: "Veuillez vérifier votre mot de passe",
        text: "Les deux mots de passe sont pas identiques ",
        showCancelButton: false,
        confirmButtonColor: "black",
        confirmButtonText: "Compris !",
        closeOnConfirm: true,
      });
    }else{

    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Minimum 8 caractéres",
        showCancelButton: false,
        confirmButtonColor: "black",
        confirmButtonText: "Compris !",
        closeOnConfirm: true,
      });
    }

    try {
      const response = await axios.post("http://127.0.0.1:8080/api/register/", {
        email: email,
        password: password,
      });
      console.log(response.data);

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
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          if ((response.data.status == 400)) {
            Swal.fire({
              icon: "error",
              title: "E-mail déja utilisée",
              showCancelButton: false,
              confirmButtonColor: "black",
              confirmButtonText: "Compris !",
              closeOnConfirm: true,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Votre compte à été bien créer",
              showCancelButton: false,
              confirmButtonColor: "black",
              confirmButtonText: "Compris !",
              closeOnConfirm: true,
            });

            navigate('welcome')
          }
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "black",
        confirmButtonText: "Compris !",
        closeOnConfirm: true,
      });
    }
  }
  }

</script>

<div class="wrapper">
  <div class="container">
    <div class="col-left">
      <div class="login-text">
        <h2 class="text-dark">YuccanLeadFAQ</h2>
        <p>
          Veuillez remplir vos informations pour créer un compte. Si vous avez
          un compte, vous pouvez vous vous connecter à votre compte en cliquant
          sur le lien ci-dessous.
        </p>
        <a class="btn" href="">Se connecter</a>
      </div>
    </div>
    <div class="col-right">
      <div class="login-form">
        <h2>Inscription à un nouveau compte</h2>
        <form on:submit={signup}>
          <p>
            <input
              type="email"
              placeholder="E-mail"
              bind:value={email}
              required
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Mot de passe"
              bind:value={password}
              required
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Confirmez votre mot de passe"
              bind:value={password_confirmation}
              required
            />
          </p>
          <p>
            <input class="btn" type="submit" value="S'inscrire" />
          </p>
          <p>
            <a href="">Vous avez déjà un compte chez nous ?</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  .wrapper {
    margin: 0 auto;
    width: 100%;
    max-width: 1140px;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .container {
    padding: 0;
    position: relative;
    width: 100%;
    max-width: 900px;
    height: 500px;
    display: flex;
    background: #ffffff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin: 0 0 15px 0;
    font-size: 30px;
    font-weight: 700;
    color: black;
  }


  p {
    margin: 0 0 20px 0;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }

  .btn {
    display: inline-block;
    padding: 7px 20px;
    font-size: 16px;
    letter-spacing: 1px;
    text-decoration: none;
    border-radius: 5px;
    color: #ffffff;
    outline: none;
    border: 1px solid #ffffff;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    background: #1c92d2;

  }

  .btn:hover {
    color: #ffffff;
    background: #1c92d2;
  }

  .col-left,
  .col-right {
    width: 55%;
    padding: 45px 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .col-left {
    width: 45%;
    background: #1c92d2; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      hwb(207 93% 3%),
      #d4e8f8
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #eef3f7,
      #d4e8f8
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
    clip-path: polygon(
      98% 17%,
      100% 34%,
      98% 51%,
      100% 68%,
      98% 84%,
      100% 100%,
      0 100%,
      0 0,
      100% 0
    );
  }

  @media (max-width: 575.98px) {
    .container {
      flex-direction: column;
      box-shadow: none;
    }

    .col-left,
    .col-right {
      width: 100%;
      margin: 0;
      padding: 30px;
      -webkit-clip-path: none;
      clip-path: none;
    }
  }

  .login-text {
    position: relative;
    width: 100%;
    color: #000000;
    text-align: center;
  }

  .login-form {
    position: relative;
    width: 100%;
    color: #666666;
  }

  .login-form p:last-child {
    margin: 0;
  }

  .login-form p a {
    color: #191a1b;
    font-size: 14px;
    text-decoration: none;
  }

  .login-form p:last-child a:last-child {
    float: left;
  }

  .login-form input {
    display: block;
    width: 100%;
    height: 40px;
    padding: 0 10px;
    font-size: 16px;
    letter-spacing: 1px;
    outline: none;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }

  .login-form input:focus {
    border-color: #132d79;
  }

  .login-form input.btn {
    color: #000000;
    background: -webkit-linear-gradient(
      to right,
      hwb(207 93% 3%),
      #d4e8f8
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #eef3f7,
      #d4e8f8
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
    border: none;
    outline: none;
    cursor: pointer;
  }

  .login-form input.btn:hover {
    color: #000000;
    background: -webkit-linear-gradient(
      to right,
      #d4e8f8,
      #eef3f7
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #d4e8f8,
      #eef3f7
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
