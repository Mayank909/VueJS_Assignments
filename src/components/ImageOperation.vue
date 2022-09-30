<template>
  <div class="container">
    <form action="" method="post">
      <div class="flex-column align-content-center">
        <div>
          <img :src="Userdata" alt="" />
          <div v-if="isuploaded">
            <img :src="Uploadedimg" alt="" />
          </div>
        </div>
        <br />
        <label for="file"> </label>
        <input
          type="file"
          accept="image/*"
          method="Pour Over"
          icon=""
          @change="updateimg"
          id="imgfile"
          class="form-control-file"
          name="file"
        /><br />
        <div class="preview ma-5">
          <img src="#" id="imgPreview" alt="your img" />
        </div>
        <br />
        <v-btn :disabled="isdisabled"
         color="primary" @click.prevent="msgupdate" class="btn ma-5">
          Upload Image
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isdisabled: false,
      Userdata: "",
    };
  },
  methods: {
    //For previewing the image file
    updateimg() {
      const [file] = imgfile.files;
      if (file) {
        imgPreview.src = URL.createObjectURL(file);
      }
    },
    //For Uploding the image to the server
    msgupdate() {
      const [imageUpload] = imgfile.files;
      const storage = getStorage();
      const imageRef = ref(storage, `images/${imageUpload.name + ".jpeg"}`);
      uploadBytes(imageRef, imageUpload).then(() => {
        alert("Image Uploaded");
      });
    },
  },
};
</script>

<style></style>
