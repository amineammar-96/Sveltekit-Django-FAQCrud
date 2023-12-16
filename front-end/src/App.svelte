<script>
  import Layout from "./layout/layout.svelte";
  import LandingScreen from "./routes/LandingScreen.svelte";
  import { Router, Route, Link } from "svelte-routing";
  import FaqScreen from "./routes/FaqScreen.svelte";
  import LoginScreen from "./routes/LoginScreen.svelte";
  import SignupScreen from "./routes/SignupScreen.svelte";
  import HistoriqueScreen from "./routes/HistoriqueScreen.svelte";
  import ContactScreen from "./routes/ContactScreen.svelte";
  import AboutScreen from "./routes/AboutScreen.svelte";
  import WelcomeScreen from "./routes/WelcomeScreen.svelte";
  import DashboardScreen from "./routes/DashboardScreen.svelte";
  import ChatgptScreen from "./routes/ChatgptScreen.svelte";
</script>

<main class="m-0 p-0">
  <Layout>
    <Router>
      <Route path="/" component={LandingScreen} />
      <Route path="/faq" component={FaqScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/signup" component={SignupScreen} />
      <Route path="/userHistory" component={HistoriqueScreen} />
      <Route path="/contact" component={ContactScreen} />
      <Route path="/about" component={AboutScreen} />
      <Route path="/welcome" component={WelcomeScreen} />
      <Route path="/dashboard" component={DashboardScreen} />
      <Route path="/chatgpt" component={ChatgptScreen} />
    </Router>
  </Layout>
</main>

<style>
  @import "bootstrap/dist/css/bootstrap.min.css";

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
