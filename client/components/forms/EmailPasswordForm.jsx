EmailPasswordForm = React.createClass({
  propTypes: {
    submitAction: React.PropTypes.func.isRequired
  },
  getDefaultProps() {
    return {
      submitBtnLabel: "Submit"
    };
  },
  render() {
    return (
      <form onSubmit={this.props.submitAction}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input placeholder="Username" type="text" id="username" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input placeholder="Password" type="password" id="password" className="form-control"/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">{this.props.submitBtnLabel}</button>
        </div>
      </form>
    )
  },
});
