import { useState, useEffect } from 'react'

import { NavLink, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setShowSidebar(true)
    }
  }, [])

  return (
    <div className="flex h-screen flex-1">
      {/* Toast */}
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      {/* Start Sidebar */}
      <div
        className={`fixed top-0 bottom-0 z-10 w-[80%] overflow-y-auto overflow-x-hidden bg-blue-700 p-4 transition-all duration-300 ease-in-out sm:static sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/6 ${
          showSidebar
            ? 'translate-x-0'
            : '-translate-x-[100%] sm:!w-[75px] sm:translate-x-0 md:!w-[75px] lg:!w-[75px] xl:!w-[75px]'
        }`}
      >
        <div className="mb-5 flex items-center justify-between border-b border-blue-500 pb-5">
          <h1 className="flex flex-nowrap items-center font-sans text-xl font-semibold text-white">
            <div className="mr-3 rounded-md bg-white py-1 px-2">
              <i className="bi bi-terminal-fill text-gray-900"></i>
            </div>

            <span
              className={`whitespace-nowrap ${!showSidebar && 'sm:hidden'}`}
            >
              Redwood ToDo
            </span>
          </h1>

          <button
            className="text-3xl font-bold text-white sm:hidden"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
        <ul>
          <li className="mb-2">
            <NavLink
              to={routes.home()}
              activeClassName="bg-blue-800"
              className="duration-250 flex items-center rounded-md py-2 px-3 font-medium text-white hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-800"
            >
              <i className="bi bi-house text-lg"></i>
              <span className={`ml-5 font-sans ${!showSidebar && 'sm:hidden'}`}>
                Dashboard
              </span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to={routes.tasks()}
              activeClassName="bg-blue-800"
              className="duration-250 flex items-center rounded-md p-2 px-3 font-medium text-white hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-800"
            >
              <i className="bi bi-list-task text-lg"></i>
              <span className={`ml-5 font-sans ${!showSidebar && 'sm:hidden'}`}>
                Tasks
              </span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to={routes.categories()}
              activeClassName="bg-blue-800"
              className="duration-250 flex items-center rounded-md p-2 px-3 font-medium text-white hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-800"
            >
              <i className="bi bi-tags text-lg"></i>
              <span className={`ml-5 font-sans ${!showSidebar && 'sm:hidden'}`}>
                Categories
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* End Sidebar */}

      {/* Start Main */}
      <div className="flex flex-1 flex-col">
        <nav className="sticky top-0 flex w-full bg-white p-2 shadow-md">
          <button
            className="text-2xl text-gray-900"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <i className="bi bi-list"></i>
          </button>
        </nav>

        <main className="p-5">{children}</main>
      </div>
      {/* End Main */}
    </div>
  )
}

export default DefaultLayout
