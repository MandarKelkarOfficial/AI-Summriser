import React from 'react'
import logo from '../logo.svg';

export default function Landing() {
  return (
    <div>
    <div class=" mt-5 mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
  <img class="size-12 shrink-0" src={logo} alt="ChitChat Logo" />
  <div>
    <div class="text-xl font-medium text-black dark:text-white">HELLO</div>
    <p class="text-gray-500 dark:text-gray-400">Welcome to the app</p>
  </div>
</div>
    </div>
  )
}
