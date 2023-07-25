export default function MainNav() {
  return (
    <div>
      <header>
      <h1 className="text-center">
       Market News
      </h1>
      </header>
      <nav className="mb-5 dark:bg-teal-800 md:max-w-[1240px] rounded-full bg-slate-300 mx-auto">
        <ul className="flex justify-evenly">
            <li className="text-xl font-bold p-2 hover:text-blue-700"><a href="">Home</a></li>
            <li className="text-xl font-bold p-2 hover:text-blue-700"><a href="">Blog</a></li>
            <li className="text-xl font-bold p-2 hover:text-blue-700"><a href="">News</a></li>
        </ul>
    </nav>
    </div>
  );
}
