<template>
  <v-card class="container" width="250" height="190">
    <form action="" method="post" enctype="multipart/form-data">
      <div class="image-area">
        <input
          type="file"
          accept="image/*"
          @change="updateImg"
          id="imgfile"
          name="file"
          @input="$emit('selectedImage', userData.split(`/`)[2])"
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
        <v-btn
          v-if="!isDisable"
          class="image-remove ma-2"
          x-small
          fab
          @click="deleteImage"
          size="35"
          color="secondary"
        >
          <v-icon dark size="20">mdi-delete</v-icon>
        </v-btn>
      </div>
    </form>
  </v-card>
</template>

<script>
import { ref, uploadBytes, getStorage, deleteObject } from "firebase/storage";
import firebase from "../firebase";
export default {
  data() {
    return {
      isDisable: false,
      userData: require("../assets/inst1.jpeg"),
      defaultText: "Upload",
    };
  },
  methods: {
    msgUpdate() {
      //For Uploding the image to the servers
      const [imageUpload] = imgfile.files;
      const storage = getStorage();
      //imageUpload.split('.');
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then(() => {
        alert("Image Uploaded");
      });
    },
    //For deletion on selected image
    deleteImage() {
      const [imageUpload] = imgfile.files;
      this.userData = "";
      this.isDisable = true;
      const storage = getStorage();
      // Create a reference to the file to delete
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      // Delete the file
      deleteObject(imageRef)
        .then(() => {
          alert("Image is Deleted Successfully.");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //For previewing the image file
    updateImg() {
      const [file] = imgfile.files;
      if (file) {
        this.userData = URL.createObjectURL(file);
        this.isDisable = false;
        this.msgUpdate();
      }
    },
    imageUploader() {
      imgfile.click();
    },
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
.image-remove {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  border-radius: 20px;
}
</style>
