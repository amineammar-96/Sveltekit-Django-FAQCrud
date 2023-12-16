<script>
  import { navigate } from "svelte-routing";
</script>

<main>
  <div id="content" class="mt-0 p-5 pt-5">
    <div class="wallpaper">
      <img
        class="header-image mb-5"
        src="assets/images/wall.png"
        alt="wallpaper"
      />
    </div>

    <div id="content-text" class="mt-1">
      <h1><span>YuccanLead </span> - Foire aux questions</h1>
      <h2>
        Réponses à vos questions sur notre application de recommandations
        bouche-à-oreille.
      </h2>
      <button class="float-right">Consulter</button>
    </div>
  </div>
</main>

<style lang="scss">
  main {
    width: 100vw;
  }

  #content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    text-align: left;
  }

  #content-text {
    font-size: 2rem;
    padding: 10rem;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .header-image {
    width: 57%;
    height: 100%;
    margin-bottom: 50px;
  }

  h1 {
    font-size: 2rem;
    line-height: 2rem;
    color: #26394e;
    margin-bottom: 1rem;
  }

  h1 span {
    color: #132d79;
    font-size: 2rem;
  }

  h2 {
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.5rem;
    margin-bottom: 1rem;
  }

  button {
    background-color: #132d79;
    padding: 1rem 3rem;
    border: 0.1rem solid #ffffff;
    border-radius: 1rem;

    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
    transition: 0.5s ease;
    margin-bottom: 4rem;
  }

  button:hover {
    background-color: #1c92d2;
    cursor: pointer;
    color: white;
    transition: 0.5s;
  }

  .wallpaper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
