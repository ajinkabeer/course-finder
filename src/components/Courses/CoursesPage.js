import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function CoursesPage() {
  const [redirectToAddCoursePage, setRedirect] = useState(false);

  const authors = useSelector((state) => state.authors);
  const loading = useSelector((state) => state.apiCallsInProgress > 0);
  const courses = useSelector((state) =>
    state.authors.length === 0
      ? []
      : state.courses.map((course) => {
          return {
            ...course,
            authorName: state.authors.find((a) => a.id === course.authorId)
              .name,
          };
        })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    handleLoadingCourses();
  }, []);

  const handleLoadingCourses = () => {
    if (courses.length === 0) {
      dispatch(courseActions.loadCourses()).catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      dispatch(authorActions.loadAuthors()).catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  };

  const handleDeleteCourse = async (course) => {
    toast.success("Course deleted");
    try {
      await dispatch(courseActions.deleteCourse(course));
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirect(true)}
          >
            Add Course
          </button>

          <CourseList onDeleteClick={handleDeleteCourse} courses={courses} />
        </>
      )}
    </>
  );
}

export default CoursesPage;
