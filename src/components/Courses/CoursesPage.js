import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors } = this.props;
    if (courses.length === 0) {
      this.loadCourses();
    }
    if (authors.length === 0) {
      this.loadAuthors();
    }
  }

  loadCourses = () => {
    this.props.actions.loadCourses().catch(error => {
      alert("Loading courses failed" + error);
    });
  };

  loadAuthors = () => {
    this.props.actions.loadAuthors().catch(error => {
      alert("Loading authors failed" + error);
    });
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h1>Courses</h1>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
