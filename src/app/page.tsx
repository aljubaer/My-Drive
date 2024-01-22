"use client"

import styles from "./page.module.css";
import { useFileContext } from "./contexts/FilesContext";
import { useEffect } from "react";

export default function Home() {
  const { files } = useFileContext();

  useEffect(() => {
    console.log(files);
  }, [files]);
  
  return (
    <main className={styles.main}>
      { files.map(file => (
        <div>
          <span>{file.name}</span>
        </div>
      )) }
    </main>
  );
}
