import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

export default class Services {
  async post(collectionName, id, payload) {
    const docRef = doc(db, collectionName, id);
    setDoc(docRef, payload);
  }
  async getAll() {
    const dataArray = [];
    await db
      .collection("categories")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          dataArray.push({ id: doc.id, document: doc.data() });
        });
      });
    return dataArray;
  }
  async delete(id) {
    await db.collection("categories").doc(id).delete();
  }
}
