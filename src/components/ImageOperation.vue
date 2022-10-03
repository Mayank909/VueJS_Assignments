<template>
  <v-card class="container">
    <form action="" method="post" enctype="multipart/form-data">
      <div class="d-flex justify-evenly align-content-center">
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
              class="flex-column text-center pa-5"
            >
              <v-icon dense x-large>mdi-upload</v-icon>
              <div>{{ defaultText }}</div>
              <div>1920x1080 Pixels (16/9 aspect ratio)</div>
              <div>Recommended.</div>
              <div>Minmum image size is 5 MB</div>
              <div>(PNG,JPG,JPEG permitted)</div>
            </v-card>
          </label>
        </div>

        <div class="preview">
          <v-img
            :aspect-ratio="16 / 9"
            width="300"
            :src="userData"
            id="imgPreview"
            alt="your image"
          >
          </v-img>
        </div>
      </div>
    </form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isdisabled: false,
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
</style>
