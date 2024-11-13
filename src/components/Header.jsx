import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/wLogo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { MdLocalMovies, MdMovieFilter } from "react-icons/md";
import { BiSolidCameraMovie } from "react-icons/bi";
import { FaFire } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";

const items = [
  {
    name: "Animated Movies",
    description: "See the most popular movies",
    href: "/all/popular-movies/?page=1",
    icon: BiSolidCameraMovie,
  },

  {
    name: "Animated Series",
    description: "See the most popular series",
    href: "all/popular-series/?page=1",
    icon: MdLocalMovies,
  },
];
// const callsToAction = [
//   { name: "Watch demo", href: "#", icon: PlayCircleIcon },
//   { name: "Contact sales", href: "#", icon: PhoneIcon },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //listen for login event
    window.addEventListener("login", () => {
      if (localStorage.getItem("user"))
        setUser(JSON.parse(localStorage.getItem("user")));
    });
    if (localStorage.getItem("user")) {
      //check if user is already logged in
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/home");
  };

  return (
    <header className="bg-secondary">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>

            <img
              className="h-10 w-auto rounded-sm"
              src={Logo}
              alt=""
              onClick={() => navigate(`/home`)}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a
            onClick={() => {
              navigate(`/home`);
            }}
            className="cursor-pointer text-sm font-semibold leading-6 text-gray-300"
          >
            Home
          </a>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300">
              Explore
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-300"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-800 shadow-lg ring-1 ring-gray-900/5">
                <div className="max-h-80 overflow-y-auto p-4">
                  {items.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-700"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-700 group-hover:bg-gray-900">
                        <item.icon
                          className="h-6 w-6 text-gray-300 group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <div
                        className="flex-auto"
                        onClick={() => {
                          navigate(item.href);
                        }}
                      >
                        <div className="block cursor-pointer font-semibold text-gray-300">
                          {item.name}
                          <span className="absolute inset-0" />
                        </div>
                        <p className="mt-1 text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-700">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      onClick={() => {
                        navigate(item.href);
                      }}
                      className="flex items-center justify-center gap-x-2.5 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-300 hover:bg-gray-600"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div> */}
              </Popover.Panel>
            </Transition>
          </Popover>
          <a
            className="cursor-pointer text-sm font-semibold leading-6 text-gray-300 
          hover:text-white"
            onClick={() => navigate(`/my-list`)}
          >
            My List
          </a>
        </Popover.Group>
        {user ? (
          <div className="hidden items-center lg:flex lg:flex-1 lg:justify-end">
            <div
              className="tooltip tooltip-bottom mx-2 flex items-center"
              data-tip={user.email}
            >
              <FaUserCircle className="h-7 w-7 text-gray-300" />
              <span className=" mx-2 font-medium text-gray-300">
                {user.userName}
              </span>
            </div>
            <div className="dropdown dropdown-end dropdown-hover">
              <div tabIndex={0} className="">
                <HiDotsVertical className="h-5 w-5 cursor-pointer text-gray-300" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a className="btn " onClick={() => navigate(`/login`)}>
              Log in
            </a>
            <a
              className="btn btn-primary ml-4 text-black"
              onClick={() => navigate(`/signup`)}
            >
              Sign up
            </a>
          </div>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={Logo} />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  onClick={() => {
                    navigate(`/home`);
                    setMobileMenuOpen(false);
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                >
                  Home
                </a>
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700">
                        Explore
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {items.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            onClick={() => {
                              navigate(`/home`);
                              setMobileMenuOpen(false);
                            }}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <a
                  onClick={() => {
                    navigate(`/my-list`);
                    h;
                    setMobileMenuOpen(false);
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                >
                  My List
                </a>
              </div>
              {!user && (
                <div className="py-6">
                  <a
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                  >
                    Log in
                  </a>
                  <a
                    onClick={() => {
                      navigate("/signup");
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                  >
                    Sign up
                  </a>
                </div>
              )}
              {user && (
                //logout
                <div className="py-6">
                  <a
                    onClick={handleLogout}
                    className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
