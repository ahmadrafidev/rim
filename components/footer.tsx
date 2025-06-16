import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-transparent py-6 text-center" role="contentinfo">
      <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-normal">
        Built by{" "}
        <Link 
          href="https://x.com/rafiwiranaa" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors hover:underline font-medium"
        >
          Rafi
        </Link>
        . The source code is available on{" "}
        <Link 
          href="https://github.com/ahmadrafidev/rim" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors hover:underline font-medium"
        >
          GitHub
        </Link>
        .
      </p>
    </footer>
  )
} 