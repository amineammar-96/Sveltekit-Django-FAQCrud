<script>
  import axios from "axios";
  import Swal from "sweetalert2";
  import { navigate } from "svelte-routing";

  let email = "admin@admin.com";
  let password = "azertyui";
  let error = "";

  let loggedIn = false;

  import { onMount } from "svelte";
  onMount(() => {
    // check if user is already authenticated and redirect
    const token = localStorage.getItem("token");
    if (token === null || token.trim() === "") {
      loggedIn = true;
    } else {
      navigate("/");
    }
  });

  async function login(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8080/api/login/", {
        email: email,
        password: password,
      });

      if (response.data.error == "Invalid credentials") {
        Swal.fire({
          icon: "error",
          title: "Veuillez vérifier vos informations",
          text: "Les informations d'identification sont invalides",
          showCancelButton: false,
          confirmButtonColor: "black",
          confirmButtonText: "Compris !",
          closeOnConfirm: true,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Bienvenu",
          showCancelButton: false,
          confirmButtonColor: "black",
          confirmButtonText: "Compris !",
          closeOnConfirm: true,
        });
        navigate("/dashboard");

        location.reload();

      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("is_admin", response.data.is_admin);
      localStorage.setItem("useremail", response.data.email);
      localStorage.setItem("user_id", response.data.user_id);

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err,
      });
      error = err.response.data.error;
    }
  }
</script>

<div class="wrapper">
  <div class="container">
    <div class="col-left">
      <div class="login-text">
        <h2 class="text-dark">YuccanLeadFAQ</h2>
        <p>
          Veuillez saisir votre adresse e-mail et votre mot de passe pour vous
          connecter à votre compte. Si vous n'avez pas encore de compte, vous
          pouvez vous inscrire en cliquant sur le lien d'inscription ci-dessous.
        </p>
        <a class="btn" href="">Inscription</a>
      </div>
    </div>
    <div class="col-right">
      <div class="login-form">
        <h2>Connexion à votre compte</h2>
        <form on:submit={login}>
          <p>
            <input
              type="text"
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
            <input class="btn" type="submit" value="Se connecter" />
          </p>
          <p
            style="
            display: flex;
            justify-content: space-between;
        "
          >
            <a href="">Mot de passe oublié ?</a>
            <a href="">Rejoignez YuccanLeadFAQ</a>
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
    background-color: #1c92d2;
  }

  .btn:hover {
    color: #ffffff;
    background-color: #1c92d2;

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

  .login-text  h2 {
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
    color: #1d1e1f;
    font-size: 14px;
    text-decoration: none;
  }

  .login-form p:last-child a:last-child {
    float: right;
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
      #eef3f7,
      #e5f0f9
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #eef3f7,
      #e5f0f9
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    border: none;
    outline: none;
    cursor: pointer;
  }

  .login-form input.btn:hover {
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
  }
</style>
