import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-transparent py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-0 sm:gap-1">
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed sm:leading-normal text-center md:text-left">
            Built by{" "}
            <Link
              href="https://x.com/arayyye"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent font-medium text-xs sm:text-sm md:text-base"
              aria-label="Visit arayyye's Twitter profile (opens in new tab)"
            >
              arayyye.
            </Link>
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed sm:leading-normal text-center md:text-left">
            The source code is available on{" "}
            <Link
              href="https://github.com/ahmadrafidev/rim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent font-medium text-xs sm:text-sm md:text-base"
              aria-label="View source code on GitHub (opens in new tab)"
            >
              GitHub.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
} 