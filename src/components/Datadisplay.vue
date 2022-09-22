<template>
  <section>
    <div class="cotent">
      <h2 class="text-center">Welcome to My Gallery</h2>
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
            <label for="file">
              <h4>You can also Upload your image:-</h4>
            </label>
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
            <div id="preview">
              <img src="#" id="imgPreview" alt="your img" />
            </div>
            <br />
            <button
              :disabled="isdisabled"
              @click.prevent="msgupdate"
              class="btn"
            >
              Upload Image
            </button>
            <button
              :disabled="isdisabled"
              class="btn"
              @click.prevent="download"
            >
              <a id="link1" download>Download Image</a>
            </button><br />
            <img src="" id="result" alt="Download Image" />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import firebase from "../firebase";
export default {
  name: "Datadisplay",
  data() {
    return {
      isdisabled: false,
      Userdata: "",
      form: {
        method: "post",
        icon: "",
      },
    };
  },
  methods: {
    async getDatafromAPI() {
      await fetch("https://randomuser.me/api/")
        .then((res) => res.json())
        .then((data) => {
          this.Userdata = data.results[0].picture.medium;
        });
    },
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
    //For Download the image file
    download() {
      // Create a reference to the file we want to download
      const storage = getStorage();
      const [imageUpload] = imgfile.files;
      const imgRef = ref(storage, `images/${imageUpload.name + ".jpeg"}`);

      // Get the download URL
      getDownloadURL(imgRef)
        .then((url) => {
          // Insert url into an <img> tag to "download
          // Or inserted into an <img> element
          const li = document.getElementById("result");
          li.setAttribute("src", url);
        })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              alert("File doesn't exist");
              break;
            case "storage/unauthorized":
              alert("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              alert("User canceled the upload");
              break;
            case "storage/unknown":
              alert("Unknown error occurred, inspect the server response");
              break;
          }
        });
    },
  },
  mounted() {
    this.getDatafromAPI();
  },
};
</script>

<style scoped>
.btn {
  margin: 30px 5px;
  background-color: blueviolet;
  color: white;
}
#preview {
  margin: 10px 0px;
  width: 75%;
  height: auto;
  border: 1px solid black;
}
#result{
  margin: 20px 0px;
}
</style>
>
