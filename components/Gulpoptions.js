var React = require('react');

var Gulpoptions = React.createClass({
  render: function () {
    return (
      <div id='Gulpoptions'>
      <form onClick={this.props.addTask}>
      <input type="checkbox" className="minify" name="minify" value="minify" />
      <span className="input-name">CSS Nano</span>
      &nbsp; | &nbsp;
      <input type="checkbox" className="closure" name="closure-compiler" value="closure-compiler" />
      <span className="input-name">Closure Complier</span>
      </form>
      </div>
    )
  }
});

module.exports = Gulpoptions;
