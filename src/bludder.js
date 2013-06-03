var bludder = (function () {
  var doc = document
    , defaultOptions = {
      "container": doc.body
      , "interval": 5000
      , "width": "400px"
      , "height": "400px"
    }
    , classes = {
      "wrapper": "bludder"
      , "currentImage": "bludder-current"
      , "nextImage": "bludder-next"
    }
    , domTemplate = (function () {
      var dom = doc.createElement("div");
      dom.className = classes.wrapper;
      return dom;
    })();
  function buildOptions(options) {
    "object" == typeof options || (options = {});
    for (var prop in defaultOptions) {
      if (!({}.hasOwnProperty.call(options, prop))) {
        options[prop] = defaultOptions[prop];
      }
      else if (prop=="container" && "string" == typeof options[prop]) {
        options[prop] = doc.getElementById(options[prop]);
      }
    }
    return options;
  }
  function buildDOM(instance, images) {
    var dom = domTemplate.cloneNode(true);
    dom.style.width = instance.options.width;
    dom.style.height = instance.options.height;
    for (var idx=0, len=images.length, img; idx<len; ++idx) {
      img = doc.createElement("img");
      idx==instance.currentIdx && (img.className = classes.currentImage);
      img.src = images[idx];
      instance.images.push(img);
      dom.appendChild(img);
    }
    return dom;
  }
  function Bludder(images, options) {
    var instance = this;
    instance.options = buildOptions(options);
    instance.minIdx = 0; instance.maxIdx = 0; instance.currentIdx = 0;
    instance.images = [];
    instance.elem = buildDOM(instance, images);
    instance.maxIdx = images.length-1;
    instance.options.container.appendChild(instance.elem);
  }

  Bludder.prototype = {
    "constructor": Bludder
    , "run": function (interval) {
      var instance = this;
      instance._timer && instance.stop();
      if ("undefined" != typeof interval) {
        "number" == typeof interval && (instance.options.interval = interval);
      }
      instance._timer = setInterval(function () {
        instance.previous && (instance.previous.className = "");
        instance.images[instance.currentIdx].className = classes.currentImage;
        instance.previous = instance.images[instance.currentIdx];
        var nextIdx = instance.currentIdx + 1;
        nextIdx > instance.maxIdx && (nextIdx = instance.minIdx);
        instance.images[nextIdx].className = classes.nextImage;
        instance.currentIdx = nextIdx;
      }, instance.options.interval);
      return instance;
    }
    , "stop": function () {
      var instance = this;
      instance._timer = clearInterval(instance._timer);
      return instance;
    }
  };

  return function (images, options) {
    return new Bludder(images, options).run();
  };
})();
