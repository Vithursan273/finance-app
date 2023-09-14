import Image from "next/image";
import ExpensesPage from "@/components/Expenses/ExpensesPage";

export default async function Home() {
  return (
    <main>
      <ExpensesPage />
    </main>
  );
}
