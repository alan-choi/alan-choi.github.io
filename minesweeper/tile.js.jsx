
(function(React) {

var Tile = React.createClass({
  handleClick: function(event) {
    event.preventDefault();
    var position = [this.props.row, this.props.col];
    if (event.altKey) {
      this.setState({flagged: true});
      this.props.updateGame(position, true);
    } else {
      this.setState({revealed: true});
      this.props.updateGame(position, false);
    }
  },

  render: function(){
    var tileText = '', tileClass = 'tile';
    if (this.props.boardTile.explored && this.props.boardTile.bombed) {
      tileText = '\u2614';
      tileClass+= ' revealed';
    } else if (this.props.boardTile.explored) {
      var bombCount = this.props.boardTile.adjacentBombCount();
      if (bombCount !== 0) {
        tileText = bombCount;
      }
      tileClass+= ' revealed';
    } else if (this.props.boardTile.flagged) {
      tileText += "\u2693";
    }

    return (
      <div
      className={tileClass}
      onClick={this.handleClick}>{tileText}</div>
    );
  }
});

React.render(<Game />, document.getElementById("minesweeper-game"));
})(window.React);
