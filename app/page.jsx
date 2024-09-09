import Link from "next/link";


export default function Home() {
  return (
    <div className="flex max-h-screen min-h-screen flex-col items-center justify-center p-4 z-40">
      <h1 className="text-4xl items-center text-center justify-center mb-4">Welcome to Our Expense Tracker</h1>
      <p className="mb-4 text-center">Track your expenses easily with our tool.</p>
      <Link href="pages/tracker">
        <button className="text-white bg-slate-400 hover:bg-slate-700 p-3 rounded">
          Go to Tracker
        </button>
      </Link>
    </div>
  );
}
