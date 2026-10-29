import { notFound } from "next/navigation";

/** Qualquer URL não reconhecido mostra o 404 dentro do layout do site. */
export default function CatchAll() {
  notFound();
}
