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
      .collection(collectionName)
      .doc(id)
      .get()
      .then((snapshot) => {
        data = snapshot.data();
      });
    return data;
  }
  async delete(collectionName, id) {
    await db.collection(collectionName).doc(id).delete();
  }
  async put(collectionName, id, payload) {
    await db.collection(collectionName).doc(id).update(payload);
  }
  sortData(clickValue, headers, tableData) {
    for (let header of headers) {
      header.sortable = false;
    }
    switch (clickValue.value) {
      case "name":
        clickValue.sortable = true;
        tableData.sort((first, second) =>
          first.name.toLowerCase() < second.name.toLowerCase() ? -1 : 1
        );
        // -1 for not require to sort
        // 1 for require a sort
        break;
      case "active":
        clickValue.sortable = true;
        tableData.sort((element) => (element.isActive ? -1 : 1));
        // -1 for not require to sort
        // 1 for require a sort
        break;
      case "price":
        clickValue.sortable = true;
        tableData.sort((first, second) => first.price - second.price);
        // -1 for not require to sort
        // 1 for require a sort
        break;
      case "discount_price":
        clickValue.sortable = true;
        tableData.sort(
          (first, second) => first.discount_price - second.discount_price
        );
        // -1 for not require to sort
        // 1 for require a sort
        break;
      default:
        break;
    }
    return tableData;
  }
}
