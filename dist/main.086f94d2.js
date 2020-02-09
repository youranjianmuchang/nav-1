// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var options = JSON.parse(localStorage.getItem('history'));
var optionsObj = options || [{
  'logo': 'A',
  'logoType': 'text',
  'url': 'http://www.acfun.cn',
  'index': '0'
}, {
  'logo': 'B',
  'logoType': 'text',
  'url': 'http://www.bilibili.com',
  'index': '1'
}];

var render = function render() {
  var optionsHtml = '';
  optionsObj.forEach(function (element, index) {
    optionsHtml += "\n            <li>\n                <a href=\"".concat(element.url, "\">\n                    <div class=\"site\">\n                        <div class=\"logo\">").concat(element.logo, "</div>\n                        <div class=\"link\">").concat(simplifyUrl(element.url), "</div>\n                        <div class=\"del\" data-index=\"").concat(index, "\">\n                            <svg class=\"icon\">\n                                <use xlink:href=\"#icon-del\"></use>\n                            </svg>\n                        </div>\n                    </div>\n                </a>\n            </li>      \n        ");
  });
  $('.options-list li:not(.last)').remove();
  $('.last').before(optionsHtml);
};

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/com\/.*/, 'com');
};

render();
$('.addSite').on('click', function () {
  var url = window.prompt('请输入网址');
  var simpleUrl = "";

  if (url.indexOf('http') > -1 || url.indexOf('www') > -1) {
    simpleUrl = simplifyUrl(url);
  } else {
    simpleUrl = url;
  }

  url = 'https://' + simpleUrl;
  optionsObj.push({
    'logo': simpleUrl[0],
    'logoType': 'text',
    'url': url,
    'index': $('.options-list li:not(.last)').length + 1
  });
  render();
});
$(document).on('click', 'li .del', function (e) {
  var index = $(e.currentTarget).attr('data-index');
  optionsObj.splice(index, 1);
  render();
  e.stopPropagation();
  return false;
});
$(document).on('keypress', function (e) {
  var key = e.key;
  optionsObj.forEach(function (element, index) {
    if (element.logo.toLowerCase() === key) {
      window.open(element.url);
    }
  });
});

window.onbeforeunload = function () {
  localStorage.setItem('history', JSON.stringify(optionsObj));
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.086f94d2.js.map