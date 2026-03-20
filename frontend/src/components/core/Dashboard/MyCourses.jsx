import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../utils/constants"
import CoursesTable from "./InstructorCourses/CoursesTable"

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0)

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const publishedCourses = courses.filter(
    (course) => course.status === COURSE_STATUS.PUBLISHED
  ).length
  const draftCourses = courses.length - publishedCourses
  const totalStudents = courses.reduce(
    (count, course) => count + (course.studentsEnroled?.length || 0),
    0
  )
  const totalValue = courses.reduce(
    (amount, course) => amount + Number(course.price || 0),
    0
  )

  return (
    <div className="space-y-10 text-slate-900">
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-8 px-6 py-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">
                Overview
              </p>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-[-0.03em] text-slate-950">
                  My Courses
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-600">
                  Review, manage, and refine your published and draft courses
                  from one clean workspace.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/dashboard/add-course")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500"
            >
              <VscAdd className="text-base" />
              <span>Add Course</span>
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Total Courses
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                {courses.length}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Published
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-emerald-950">
                {publishedCourses}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                Drafts
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-amber-950">
                {draftCourses}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                Catalog Value
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-tight">
                {formatPrice(totalValue)}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                {totalStudents} enrolled learners across all courses
              </p>
            </div>
          </div>
        </div>
      </section>

      <CoursesTable courses={courses} setCourses={setCourses} />
    </div>
  )
}
