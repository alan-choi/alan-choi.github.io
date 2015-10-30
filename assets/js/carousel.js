$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.screenshots = this.$el.find("li").length;

  document.onkeydown = function(e){
    switch(e.keyCode) {
      case 37:
      this.slide("left");
      break;
      case 39:
      this.slide("right");
      break;
      case 27:
      this.$el.removeClass('show');
      break;
    }
  }.bind(this);

  this.$el.on('click', 'button.slide-left', this.slide.bind(this, "left"));
  this.$el.on('click', 'button.slide-right', this.slide.bind(this, "right"));
};

$.Carousel.prototype.slide = function (direction) {
  var $oldImage = this.$el.find("li").eq(this.activeIdx);
  if (direction === "right") { this.activeIdx++; }
  if (direction === "left") { this.activeIdx--; }
  if (this.activeIdx === -1) {this.activeIdx = this.screenshots-1;}
  if (this.activeIdx === this.screenshots) {this.activeIdx = 0;}

  var $nextImage = this.$el.find("li").eq(this.activeIdx);
  $oldImage.removeClass("active");
  $nextImage.addClass("active");
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
