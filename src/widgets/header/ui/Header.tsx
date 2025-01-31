import Link from "next/link";
import MENU_LIST from "../consts/menu-list";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-5 border-b border-gray-300">
      <h2 className="text-2xl font-bold">
        <Link href="/">Demo App</Link>
      </h2>
      <ul className="flex gap-9">
        {MENU_LIST.map((menu, idx) => (
          <li key={idx}>
            <Link href={menu.href}>{menu.text}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
