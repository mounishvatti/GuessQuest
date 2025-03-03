export default function Footer() {
    return (
      <footer className="m500:text-sm dark:bg-secondaryBlack z-30 bg-white px-5 py-5 text-center font-base">
        The source code is available on{' '}
        <a
          target="_blank"
          href="https://github.com/mounishvatti/guessquest"
          className="font-heading underline"
        >
          Github
        </a>
        .
      </footer>
    )
  }