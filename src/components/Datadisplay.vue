<template>
  <section>
    <div class="cotent">
      <h2 class="text-center">Welcome to My Gallery</h2>
      <div class="container" >
      <form action="" method="post">
        <div class="flex-column align-content-center"  >
         <div>
          <img :src="Userdata" alt="">
          <div  v-if="isuploaded">
          <img :src="Uploadedimg" alt=""> 
          </div>
         </div><br>
        <label for="file" >
          <h4>You can also Upload your image:-</h4>
        </label>
        <input type="file" accept="image/*" method="Pour Over" icon="" @change="updateimg" id="imgfile" class="form-control-file" name="file" /><br/>
        <div id="preview"><img src="#" id="imgPreview" alt="your img"> </div><br/>
        <button :disabled="isdisabled" @click.prevent="msgupdate" class="btn" >Upload Image</button>
        <button :disabled="isdisabled" class="btn" @click.prevent="" ><a id="link1"  download>Download Image</a></button>
        </div>
      </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  
  name: "Datadisplay",
  data (){
    return  {
      isdisabled: false,
      Userdata: "",
      form: {
        method: "post",
        icon: ""
      }
    }
  },
  methods: {
  async getDatafromAPI(){
    await fetch('https://randomuser.me/api/').then(
      (res) => res.json()
    ).then((data)=>{
      this.Userdata = data.results[0].picture.medium;
    });
    
   },
   updateimg(event){
     const [file]= imgfile.files
     if(file){
      imgPreview.src= URL.createObjectURL(file)
     }
     const files = event.target.files
     let formData = new FormData();
      formData.append('method', this.form.method)
      formData.append('icon', this.form.icon)
     fetch('<https://api.roastandbrew.cofee/api/v1/brew-methods>',{
      method: 'POST', 
      headers:{
      'Authorization': 'Bearer '+this.token,
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
     },
     body: formData
     }
      ).then(
      function(res){
        if(res.status !== 201){
          this.fetchError= res.status;
        }
        else{
          res.json().then(function(data){
            this.fetchRespose = data;
            console.log(this.fetchRespose)
          }.bind(this));
        }
      }.bind(this)
     )
     
    let Img = new Blob([file],{type: 'image/*'});
    link1.download = 'download.jpeg';
    link1.href = window.URL.createObjectURL(Img);
     
   },
   msgupdate(){
    alert("Image is uploaded Successfully.");
   },


  },
  mounted(){
    this.getDatafromAPI();
  }
  
}
</script>

<style scoped>

.btn{
  margin: 30px 5px;
  background-color: blueviolet;
  color: white;
}
#preview{
  margin:10px 0px;
  width: 75%;
  height: auto;
  border: 1px solid black;
}
</style>>
