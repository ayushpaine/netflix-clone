import React, { useEffect, useState } from "react";
import { Movie } from "../types";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";

const useList = (uid: string | undefined) => {
  const [list, setList] = useState<Movie[] | DocumentData[]>();

  useEffect(() => {
    if (!uid) {
      return;
    }
    return onSnapshot(
      collection(db, "customers", uid, "myList"),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [db, uid]);

  return list;
};

export default useList;
