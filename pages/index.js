import Head from "next/head";
import Image from "next/image";
import Container from "../components/container/container";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="index d-flex justify-content-center align-items-center py-3">
      <Container />
    </div>
  );
}
