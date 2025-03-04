import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  // PhoneIcon,
  // PlayCircleIcon,
} from "@heroicons/react/20/solid";

import { badgeCategories } from "../utils/badgeCategories";

import { useState } from "react";
import { LoggedUserContext } from "../context/contexts";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NavigationComponent() {
  /** @userData logged user data from the LoggedUserContextProvider */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userData = useContext(LoggedUserContext);
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      axios.post("/api/auth/logout");
      navigate("/login");
      toast.success("User is logged out");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in logging out");
    }
  };
  // console.log(userData);

  return (
    <>
      {/** DESKTOP */}
      <header className='bg-white'>
        <nav
          aria-label='Global'
          className='mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8'
        >
          <div className='flex lg:flex-1 items-center'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <img
                alt=''
                src={
                  userData?.userData?.photoUrl
                    ? userData?.userData?.photoUrl
                    : "./logo.png"
                }
                className='h-10 w-auto rounded-3xl'
              />
            </a>
            <p className='px-2'>{`Welcome ${userData?.userData?.username}`}</p>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(true)}
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon aria-hidden='true' className='size-6' />
            </button>
          </div>
          <PopoverGroup className='hidden lg:flex lg:gap-x-12'>
            <Popover className='relative'>
              <PopoverButton className='flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900'>
                Search other's recipes
                <ChevronDownIcon
                  aria-hidden='true'
                  className='size-5 flex-none text-gray-400'
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className='absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in'
              >
                <div className='p-4'>
                  <span>
                    Search other recipes by category from around the world
                  </span>
                  {badgeCategories.map((item) => (
                    <div
                      key={item.name}
                      className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50'
                    >
                      <div className='flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
                        <item.icon
                          aria-hidden='true'
                          className='size-6 text-gray-600 group-hover:text-indigo-600 text'
                        />
                      </div>
                      <div className='flex-auto'>
                        <a
                          href={item.href}
                          className='block font-semibold text-gray-900'
                        >
                          {item.name}
                          <span className='absolute inset-0' />
                        </a>
                        <p className='mt-1 text-gray-600'>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <a href='#' className='text-sm/6 font-semibold text-gray-900'>
              Create your own recipe
            </a>
            <a href='#' className='text-sm/6 font-semibold text-gray-900'>
              About Us
            </a>
          </PopoverGroup>
          {userData?.userData ? (
            <>
              <div
                className='hidden lg:flex lg:flex-1 lg:justify-end'
                onClick={handleLogoutClick}
              >
                <a href='#' className='text-sm/6 font-semibold text-gray-900'>
                  Log out <span aria-hidden='true'>&rarr;</span>
                </a>
              </div>
            </>
          ) : (
            <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
              <a href='#' className='text-sm/6 font-semibold text-gray-900'>
                Log in <span aria-hidden='true'>&rarr;</span>
              </a>
            </div>
          )}
        </nav>
        {/* mobile*/}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className='lg:hidden'
        >
          <div className='fixed inset-0 z-10' />
          <DialogPanel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
            <div className='flex items-center justify-between'>
              <a href='#' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Your Company</span>
                <img
                  alt=''
                  src='/logo.png'
                  className='h-10 w-auto rounded-3xl'
                />
              </a>
              <button
                type='button'
                onClick={() => setMobileMenuOpen(false)}
                className='-m-2.5 rounded-md p-2.5 text-gray-700'
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon aria-hidden='true' className='size-6' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  <Disclosure as='div' className='-mx-3'>
                    <DisclosureButton className='group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'>
                      Search other's recipes
                      <ChevronDownIcon
                        aria-hidden='true'
                        className='size-5 flex-none group-data-open:rotate-180'
                      />
                    </DisclosureButton>
                    <DisclosurePanel className='mt-2 space-y-2'>
                      <section className='bg-custom-green rounded-2xl p-6'>
                        <span className='flex justify-center text-sm'>
                          Search other recipes by category from around the world
                        </span>
                      </section>
                      {/** Other recipes submenu */}
                      {[...badgeCategories].map((item, idx) => (
                        <section
                          className={`flex items-center gap-2 px-1 rounded-2xl ${
                            idx % 2 === 0
                              ? "text-custom-blue"
                              : "text-custom-yellow"
                          }`}
                          key={item.name}
                        >
                          <item.icon size={30} />
                          <DisclosureButton
                            as='a'
                            href={item.href}
                            className={`block w-screen rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold  hover:bg-gray-50 ${
                              idx % 2 === 0
                                ? "text-custom-blue"
                                : "text-custom-yellow"
                            }`}
                          >
                            {item.name}
                          </DisclosureButton>
                        </section>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <a
                    href='#'
                    className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                  >
                    Features
                  </a>
                  <a
                    href='#'
                    className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                  >
                    Marketplace
                  </a>
                  <a
                    href='#'
                    className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                  >
                    Company
                  </a>
                </div>
                {userData?.userData ? (
                  <>
                    {" "}
                    <div className='py-6' onClick={handleLogoutClick}>
                      <a
                        href='#'
                        className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                      >
                        Log out
                      </a>
                    </div>
                  </>
                ) : (
                  <div className='py-6'>
                    <a
                      href='#'
                      className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
                    >
                      Log in
                    </a>
                  </div>
                )}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
}
export default NavigationComponent;
