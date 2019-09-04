import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    //we can also do : <input {...formProps.input} />
    console.log(meta);
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        <div>{this.handleError(meta)}</div>
      </div>
    );
  };
  handleError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  onSubmit = formValues => {
    console.log(formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    //console.log(this.props);
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "you must have entered title";
  }
  if (!formValues.description) {
    errors.description = "you must have entered description";
  }
  return errors;
};

export default reduxForm({
  form: "StreamForm",
  validate: validate
})(StreamForm);
