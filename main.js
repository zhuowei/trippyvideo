var processor = {
  timerCallback: function() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    var self = this;
    setTimeout(function () {
        self.timerCallback();
      }, 0);
  },

  doLoad: function() {
    this.video = document.getElementById("video");
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    this.c2 = document.getElementById("c2");
    this.ctx2 = this.c2.getContext("2d");
    var self = this;
    this.video.addEventListener("play", function() {
        c1.width = c2.width = self.width = self.video.videoWidth;
        c1.height = c2.height = self.height = self.video.videoHeight;
        self.timerCallback();
      }, false);
    this.video.play();
  },

  computeFrame: function() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    var frame = this.ctx1.getImageData(0, 0, this.width, this.height);
		var l = frame.data.length;

    for (var i = 0; i < l; i+=4) {
      var r = frame.data[i + 0];
      var g = frame.data[i + 1];
      var b = frame.data[i + 2];
      frame.data[i + 0] = ((r & 0x3f) << 2) | (r & 0x3);
      frame.data[i + 1] = ((g & 0x3f) << 2) | (g & 0x3);
      frame.data[i + 2] = ((b & 0x3f) << 2) | (b & 0x3);
    }
    this.ctx2.putImageData(frame, 0, 0);
    return;
  }
};
