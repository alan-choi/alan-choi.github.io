var React = require('react');

var Tile = React.createClass({
  handleClick: function(event) {
    event.preventDefault();
    var flagged = event.altKey;
    this.props.updateGame(this.props.tile, flagged);
  },

  render: function() {
    var tile = this.props.tile;
    var bombCount = (tile.tileValue() === 0 ? "" : tile.tileValue());
    var tileClass, text;

    if (tile.explored && !tile.isBomb) {
      tileClass = "explored";
      text = bombCount;
    } else if(tile.flagged) {
      tileClass = "flagged";
      text = "F";
    } else if(tile.isBomb && tile.explored) {
      tileClass = "explored bomb";
      text = "B";
    } else {
      tileClass = "unexplored";
      text = "";
    }

    return(
      <div className={"tile "+tileClass} onClick={this.handleClick}> { text } </div>
    );
  }
});

module.exports = Tile;
