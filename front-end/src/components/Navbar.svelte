<script>
  let loggedIn = false;
  import { Router, Link, navigate } from "svelte-routing";

  import { onMount } from "svelte";

 window.addEventListener("load", updateCurrentPath);
 window.addEventListener("DOMContentLoaded", updateCurrentPath);

  window.addEventListener("popstate", updateCurrentPath);
  function updateLocalstorage(){
    let aux = localStorage.getItem('token');
    if (aux === null || aux.trim() === "") {
      loggedIn=false;
    } else {
      loggedIn = true;
    }
  }
  let currentPath = "";

async function updateCurrentPath() {
  currentPath = window.location.pathname;
}
  onMount(() => {

    let intervalId = setInterval(() => {
     updateCurrentPath();
    }, 100); 

    const token = localStorage.getItem("token");
    if (token === null || token.trim() === "") {
      navigate("/");
    } else {
      loggedIn = true;
    }
    
  });

</script>

<Router>
  <nav class="p-0 m-0 navbar navbar-dark navbar-expand-sm">
    <div class="container">
      <a href="/" on:click={updateCurrentPath} class="navbar-brand text-dark">
        <i class="fa-solid fa-cloud" /> Yuccanleads<span class="logoSpan"
          >FAQ</span
        >
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          {#if loggedIn}
          <li class="nav-item" class:active={currentPath === "/dashboard"}>
            <Link on:click={updateCurrentPath} to="/dashboard" class="nav-link text-dark">Dashboard</Link>
          </li>
        {/if}
          <li class:active={currentPath === "/"} class="nav-item">
            <Link on:click={updateCurrentPath} to="/" class="nav-link text-dark">Accueil</Link>
          </li>
          <li class:active={currentPath === "/faq"} class="nav-item">
            <Link on:click={updateCurrentPath} to="/faq" class="nav-link text-dark">FAQ</Link>
          </li>
          <!-- {#if !loggedIn}
            <li class:active={currentPath === "/about"} class="nav-item">
              <Link on:click={updateCurrentPath} to="/about" class="nav-link text-dark">
                Qui sommes-nous ?
              </Link>
            </li>
          {/if} -->

         

          {#if !loggedIn}
            <li class="nav-item" class:active={currentPath === "/signup"}>
              <Link to="/signup" on:click={updateCurrentPath} class="nav-link text-dark">Inscription</Link>
            </li>
          {/if}
          {#if !loggedIn}
            <li class="nav-item" class:active={currentPath === "/login"}>
              <Link to="/login" on:click={updateCurrentPath} class="nav-link text-dark">Connexion</Link>
            </li>
          {/if}

         
          
         

          <li class="nav-item" class:active={currentPath === "/contact"}>
            <Link to="/contact" on:click={updateCurrentPath} class="nav-link text-dark">Contactez-nous</Link>
          </li>

          <li class="nav-item" class:active={currentPath === "/chatgpt"}>
            <Link to="/chatgpt" on:click={updateCurrentPath} class="nav-link text-dark">ChatGPT</Link>
          </li>

         
          <li class="nav-item">
            <a
              href="https://www.yuccanlead.fr/"
              target="_blank"
              class="nav-link text-dark"
            >
              YuccanLead
            </a>
          </li>
        
        </ul>
      </div>
    </div>
  </nav>
</Router>

<style>
  @import "bootstrap/dist/css/bootstrap.min.css";

  .active {
    background-color: #e5f0fa;
    font-weight: bold;
  }
  nav {
    background-color: #eef3f7;
  }
  nav li {
    padding: 10px 10px;
  }
  nav li a {
    font-weight: bold;
    font-size: 0.9rem;
  }
  nav li:hover {
    background-color: #e5f0fa;
  }
  .navbar-brand i {
    color: #132d79;
  }
  .logoSpan {
    color: #132d79;
  }
</style>
