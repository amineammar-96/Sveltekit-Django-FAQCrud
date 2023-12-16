<script>
	import Navbar from '../components/Navbar.svelte';
    import Footer from '../components/Footer.svelte';
</script>
<div class="m-0 p-0">

   
    <Navbar/>
    <main>
      <slot></slot>
    </main>
    <Footer/>
   
    
  </div>