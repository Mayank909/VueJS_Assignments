import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

export default class Services {
  async post(collectionName, id, payload) {
    const docRef = doc(db, collectionName, id);
    setDoc(docRef, payload);
  }
  async getAll(collectionName) {
    const dataArray = [];
    await db
      .collection(collectionName)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          dataArray.push({ id: doc.id, document: doc.data() });
        });
      });
    return dataArray;
  }
  async get(collectionName, id) {
    let data;
    await db
      .collection(collectionName).doc(id)
      .get()
      .then((snapshot) => {
        data = snapshot.data();
      });
   return data;
  }
  async delete(collectionName,id) {
    await db.collection(collectionName).doc(id).delete();
  }
  async put(collectionName,id, payload) {
    await db.collection(collectionName).doc(id).update(payload);
  }
}
