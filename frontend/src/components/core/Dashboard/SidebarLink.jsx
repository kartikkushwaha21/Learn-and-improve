import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-white text-indigo-600 shadow-[0_10px_30px_rgba(99,102,241,0.12)] ring-1 ring-indigo-100"
          : "text-slate-500 hover:bg-white hover:text-slate-900"
      } transition-all duration-200`}
    >
      <Icon className="text-base" />
      <span>{link.name}</span>
    </NavLink>
  )
}
