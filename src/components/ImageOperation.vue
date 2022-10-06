<template>
  <v-card class="container" width="250" height="190">
    <form action="" method="post" enctype="multipart/form-data">
      <div class="image-area">
        <input
          type="file"
          accept="image/*"
          icon=""
          @change="updateImg"
          id="imgfile"
          name="file"
        />
        <label for="file">
          <v-card
            @click="imageUploader"
            color="secondary"
            width="250"
            height="190"
          >
            <v-img
              cover
              :aspect-ratio="12 / 9"
              width="400"
              :src="userData"
              id="imgPreview"
              alt="your image"
            >
            </v-img>
          </v-card>
        </label>
      </div>
    </form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isDisabled: false,
      userData: require("../assets/inst1.jpeg"),
      defaultText: "Upload",
    };
  },
  methods: {
    //For previewing the image file
    updateImg() {
      const [file] = imgfile.files;
      if (file) {
        this.userData = URL.createObjectURL(file);
        this.msgupdate();
      }
    },
    imageUploader() {
      this.isDisabled = true;
      imgfile.click();
    },
  },
  //For Uploding the image to the server
  msgupdate() {
    const [imageUpload] = imgfile.files;
    const storage = getStorage();
    //imageUpload.split('.');
    const imageRef = ref(storage, `images/${imageUpload.name + ".jpeg"}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded");
    });
  },
};
</script>

<style>
input[type="file"] {
  display: none;
}
.image-area {
  width: 30%;
}
</style>
