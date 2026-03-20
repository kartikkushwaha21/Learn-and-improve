import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import {
  FiBookOpen,
  FiCalendar,
  FiEdit2,
  FiUsers,
} from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../Common/ConfirmationModal"

const DESCRIPTION_WORD_LIMIT = 28

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0)

const truncateDescription = (value = "") => {
  const words = value.split(" ")
  if (words.length <= DESCRIPTION_WORD_LIMIT) {
    return value
  }

  return `${words.slice(0, DESCRIPTION_WORD_LIMIT).join(" ")}...`
}

export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  if (!courses?.length) {
    return (
      <>
        <section className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
            <FiBookOpen className="text-[28px]" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
            You have not created any courses yet
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            Start building your course catalog. Your first draft will appear
            here with the same edit and delete controls once it is created.
          </p>
          <button
            onClick={() => navigate("/dashboard/add-course")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500"
          >
            <FiBookOpen className="text-base" />
            <span>Create a course</span>
          </button>
        </section>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </>
    )
  }

  return (
    <>
      <section className="space-y-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              Course Library
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              Review and curate your latest course lineup
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Each card keeps the same management actions from the previous
              table, now in a more visual dashboard layout.
            </p>
          </div>

          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            {courses.length} course{courses.length > 1 ? "s" : ""}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
          {courses.map((course) => {
            const isDraft = course.status === COURSE_STATUS.DRAFT

            return (
              <article
                key={course._id}
                className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                        isDraft
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {isDraft ? (
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                      ) : (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[8px] text-white">
                          <FaCheck />
                        </span>
                      )}
                      {isDraft ? "Drafted" : "Published"}
                    </span>
                  </div>
                </div>

                <div className="space-y-6 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                        {course.courseName}
                      </h3>
                      <p className="text-sm leading-7 text-slate-600">
                        {truncateDescription(course.courseDescription)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        disabled={loading}
                        onClick={() =>
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }
                        title="Edit"
                        className="rounded-full p-2 text-slate-500 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Do you want to delete this course?",
                            text2:
                              "All the data related to this course will be deleted",
                            btn1Text: !loading ? "Delete" : "Loading...  ",
                            btn2Text: "Cancel",
                            btn1Handler: !loading
                              ? () => handleCourseDelete(course._id)
                              : () => {},
                            btn2Handler: !loading
                              ? () => setConfirmationModal(null)
                              : () => {},
                          })
                        }}
                        title="Delete"
                        className="rounded-full p-2 text-slate-500 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <RiDeleteBin6Line size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Price
                      </p>
                      <p className="mt-3 text-lg font-semibold text-indigo-600">
                        {formatPrice(course.price)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Modules
                      </p>
                      <p className="mt-3 text-lg font-semibold text-slate-950">
                        {course.courseContent?.length || 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 pt-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <FiUsers className="text-base" />
                      <span>
                        {course.studentsEnroled?.length || 0} enrolled
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-base" />
                      <span>Created {formatDate(course.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
