import Link from "next/link"

export default function Home() {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Time to get started!
      </h1>
      <p>
        <Link href="/meals">Meals</Link>
      </p>
      <p>
        <Link href="/meals/share">Meals Share</Link>
      </p>
      <p>
        <Link href="/community">Community</Link>
      </p>
      <p>
        <Link href="/meals/no-1">Meals No 1</Link>
      </p>
      <p>
        <Link href="/meals/no-2">Meals No 2</Link>
      </p>
    </main>
  )
}
