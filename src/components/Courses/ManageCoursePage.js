import React, { Component } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

class ManageCoursePage extends Component {
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
    const { loadCourses } = this.props;
    loadCourses().catch(error => {
      alert("Loading courses failed" + error);
    });
  };

  loadAuthors = () => {
    const { loadAuthors } = this.props;
    loadAuthors().catch(error => {
      alert("Loading authors failed" + error);
    });
  };

  render() {
    return (
      <>
        <h1>Manage Course</h1>
      </>
    );
  }
}

ManageCoursePage.propTypes = {
  actions: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
