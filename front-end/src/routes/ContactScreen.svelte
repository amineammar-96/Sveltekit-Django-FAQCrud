<h2 class=" px-5 pt-5" style="text-align:left; ">Formulaire de contact</h2>
<h6 class=" px-5" style="text-align:left; ">
  Si vous avez des questions, des commentaires ou des suggestions, n'hésitez pas
  à nous contacter en remplissant le formulaire ci-dessous. <br /> Nous ferons
  de notre mieux pour vous répondre dans les meilleurs délais. <br /> Merci de votre
  intérêt pour notre entreprise.
</h6>

<section class="contact-container mt-5 mb-5 p-5 pb-0">
  <form class="contact-form">
    <div class="heading">
      <h2>Besoin d'aide ou d'assistance ? Contactez-nous</h2>
      <p>
        Pour toute question ou demande, n'hésitez pas à nous contacter.
        Remplissez le formulaire ci-dessous et nous vous répondrons dans les
        plus brefs délais.
      </p>
    </div>
    <div class="input">
      <i class="fa-regular fa-user" />
      <input name="username" type="text" placeholder="Nom complét" />
    </div>
    <div class="input">
      <i class="fa-regular fa-envelope" />
      <input name="email" type="email" placeholder="E-mail" />
    </div>
    <div class="input">
      <i class="fa-regular fa-message" />
      <textarea
        name="message"
        cols="30"
        rows="10"
        placeholder="Message...."
        style="resize: none"
      />
    </div>
    <input class="button" type="button" value="Envoyer votre demande" />
  </form>
  <div class="contact-info">
    <h3 class="heading">Nos coordonnées</h3>
    <ul class="contacts">
      <li>
        <i class="fa-solid fa-location-dot" />
        25 Quai du Président Paul Doumer <br /> 92400 Courbevoie
      </li>
      <li>
        <i class="fa-solid fa-envelope" />
        info@yuccanlead.com
      </li>
      <li>
        <i class="fa-solid fa-phone" />
        +33 (0)1 34 80 72 92
      </li>
      <li>
        <i class="fa-solid fa-print" />
        +33 (0)1 34 80 72 92
      </li>
    </ul>
    <div class="social-links" />
  </div>
</section>

<h2 class=" px-5 pt-5 mt-5" style="text-align:left; ">Google Maps</h2>
<h4 class=" px-5" style="text-align:left; ">
  Nous sommes heureux de vous accueillir dans notre établissement. <br /> Pour
  vous aider à nous trouver plus facilement, nous avons inclus une carte Google
  Maps ci-dessous. <br /> Vous pouvez zoomer et déplacer la carte pour obtenir
  des indications précises sur notre emplacement. <br /> Nous espérons vous voir
  bientôt !
</h4>


<style>
  @import url("https://fonts.googleapis.com/css2?family=Raleway&display=swap");

  .contact-container {
    display: flex;
    flex-direction: row;
    width: 90%;
    margin: 144px 48px;
    border-radius: 4px;
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

    /* clip-path: polygon(98% 17%, 100% 34%, 98% 51%, 100% 68%, 98% 84%, 100% 100%, 0 100%, 0 0, 100% 0); */
    clip-path: polygon(100% 0%, 97% 57%, 100% 98%, 0 100%, 0 48%, 0 0);
  }

  .contact-form {
    position: relative;
    flex-grow: 1;
    padding: 0px 48px;
    background-color: #ffffff;
  }

  .contact-form::before {
    position: absolute;
    content: "";
    top: -96px;
    left: 0;
    width: 100%;
    height: calc(100% + 192px);
    background-color: #ffffff;
    border-radius: 4px;
    z-index: -100;
  }

  .contact-form .heading {
    margin-bottom: 48px;
  }

  .contact-form .heading h2 {
    margin-bottom: 8px;
    color: #27272a;
    font-size: 36px;
  }

  .contact-form .heading p {
    color: #4b5563;
    font-size: 16px;
  }

  .contact-form .input {
    position: relative;
    margin-bottom: 24px;
  }

  .contact-form .input input,
  .contact-form .input textarea {
    width: 100%;
    padding: 8px 8px 8px 42px;
    border: 1px solid #d4d4d8;
    border-radius: 4px;
    background-color: #fafafa;
    font-size: 14px;
  }

  .contact-form .input i {
    position: absolute;
    top: 10px;
    left: 12px;
    color: #4b5563;
  }

  .contact-form .button {
    padding: 12px 36px;
    border: none;
    border-radius: 4px;

    background: -webkit-linear-gradient(
      to right,
      #1c92d2,
      #1c92d2
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #1c92d2,
      #1c92d2
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    box-shadow: inset 0 -2px 4px 0 #1c92d2;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
  .contact-form .button:hover {
    background: -webkit-linear-gradient(
      to right,
      #2a96d0,
      #1c92d2
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #2894ce,
      #1c92d2
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .contact-form .button:active {
    box-shadow: inset 0 0 4px 2px #87b2ca;
  }

  .contact-info {
    padding: 83px 20px;
    color: #000000;
  }

  .contact-info .heading {
    margin-bottom: 48px;
    font-size: 24px;
  }

  .contact-info .contacts li {
    padding-left: 24px;
    margin-bottom: 32px;
    font-size: 14px;
    text-align: left;
    text-decoration: none;
    list-style-type: none;
    width: 17vw;
  }

  .contact-info .contacts li i {
    width: 24px;
    padding-right: 12px;
  }

  @media screen and (max-width: 1024px) {
    .contact-container {
      flex-direction: column;
      margin: 0;
    }

    .contact-form {
      padding: 96px 48px;
    }
  }
</style>
