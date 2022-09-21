<template>
  <section  id="nav">
    <div id= "navbar">
      <div id="logo">My Gallery</div>
      <div class="menu-option">
        <ul id="mopt">
            <li><a href="#" class="opt" >Home</a></li>
            <li><a href="#" class="opt" >About</a></li>
            <li><a href="#" class="opt" >Contact</a></li>
            <li><a href="#" class="opt" >More</a></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name:'Navbar'
}
</script>

<style scoped>

#navbar{
    background-color: rgb(34, 32, 32);
    color: white;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0px 20px;
}
.opt{
   text-decoration: none;
   color: white;
   font-size: 20px;
   padding: 15px;
}
#mopt{
  list-style-type: none;
  display: flex;
  align-content: center;
  margin: 10px;
}
#logo{
  font-size: 30px;
  padding: 5px;
}

</style>