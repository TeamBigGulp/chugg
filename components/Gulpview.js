var React = require('react');
var Codemirror = require('react-codemirror');

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');


var Gulpview = React.createClass({
  render: function () {
    var options = {
            lineNumbers: true,
            mode: 'javascript'
        };
    return (
      <div id='Gulpview'>
      <form onClick={this.props.addTask}>
      <input type="checkbox" className="minify" name="minify" value="minify" />
      <span className="input-name">CSS Nano</span>
      &nbsp; | &nbsp;
      <input type="checkbox" className="closure" name="closure-compiler" value="closure-compiler" />
      <span className="input-name">Closure Complier</span>
      </form>
      <Codemirror value={this.props.value} onChange={this.props.codeChange} options={options} />
      <form id="download-files" onSubmit={this.props.download}>
      <input type="submit" value="Download Files" />
      </form>
      </div>
    )
  }
});

module.exports = Gulpview;
