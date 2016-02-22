var React = require('react');
var Codemirror = require('react-codemirror');

require('codemirror/mode/javascript/javascript');
// require('codemirror/theme/solarized.css');
require('codemirror/mode/markdown/markdown');
//Dear next team, please do this. We wanted to show this in the view as well but did not get the time to add functionality.

var Packagejson = React.createClass({
  render: function () {
    var options = {
            lineNumbers: true,
            mode: 'application/json'
        };
    return (
      <div id='Packagejson'>
      Packages
      <Codemirror value={this.props.value} onChange={this.props.jsonChange} options={options} />

      </div>
    )
  }
});

module.exports = Packagejson;
