import { Link, useNavigate } from 'react-router-dom'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useUserStore } from '../store/useUserStore'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)
  const navigate = useNavigate()

  const navigation = user
    ? user.rol === 'admin'
      ? [
          { name: 'Dashboard', href: '/dashboard-admin' },
          { name: 'Pacientes', href: '/pacientes' },
          { name: 'Turnos', href: '/turnos' },
        ]
      : [{ name: 'Dashboard', href: '/dashboard-medico' }]
    : []

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 inset-x-0 z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link to="/" className="shrink-0 text-white font-bold">
                  MEDM8
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {user && (
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="relative ml-3">
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <img
                          src={user.foto || 'https://placehold.co/32'}
                          alt=""
                          className="size-8 rounded-full"
                        />
                        <span className="ml-2 text-white hidden sm:block">
                          {user.nombre} {user.apellido}
                        </span>
                      </MenuButton>
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              to="/perfil"
                              className={classNames(
                                focus ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Mi perfil
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                focus ? 'bg-gray-100' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Cerrar sesión
                            </button>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
              )}
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="group inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className={classNames(open ? 'hidden' : 'block', 'size-6')} aria-hidden="true" />
                  <XMarkIcon className={classNames(open ? 'block' : 'hidden', 'size-6')} aria-hidden="true" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            {user && (
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="shrink-0">
                    <img
                      src={user.foto || 'https://placehold.co/40'}
                      alt=""
                      className="size-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.nombre} {user.apellido}
                    </div>
                    <div className="text-sm font-medium text-gray-400">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <DisclosureButton
                    as={Link}
                    to="/perfil"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Mi perfil
                  </DisclosureButton>
                  <DisclosureButton
                    as="button"
                    className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </DisclosureButton>
                </div>
              </div>
            )}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
