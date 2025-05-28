"use strict";
(self["webpackChunkHalo"] = self["webpackChunkHalo"] || []).push([["assets_js_theme_blog_js"],{

/***/ "./assets/js/theme/blog.js":
/*!*********************************!*\
  !*** ./assets/js/theme/blog.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Blog)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _halothemes_haloBlogByTag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./halothemes/haloBlogByTag */ "./assets/js/theme/halothemes/haloBlogByTag.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var Blog = /*#__PURE__*/function (_PageManager) {
  function Blog(context) {
    return _PageManager.call(this, context) || this;
  }
  _inheritsLoose(Blog, _PageManager);
  var _proto = Blog.prototype;
  _proto.onReady = function onReady() {
    (0,_halothemes_haloBlogByTag__WEBPACK_IMPORTED_MODULE_1__["default"])(this.context);
  };
  return Blog;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./assets/js/theme/halothemes/haloBlogByTag.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/halothemes/haloBlogByTag.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  var token = context.token;
  var blogblock = $('[data-blog-tag]'),
    tag;
  function getPosts() {
    var i = 0;
    var _loadBlog = function loadBlog(i) {
      tag = blogblock.eq(i).attr('data-blog-tag');
      getBlog(tag).then(function (data) {
        renderBlog(data.site.content.blog.posts.edges, tag);
        if (i + 1 < blogblock.length) {
          i++;
          _loadBlog(i);
        }
      });
    };
    _loadBlog(i);
  }
  function getBlog(tag) {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        query: "\n            query MyQuery {\n                site {\n                    content {\n                        blog {\n                            name\n                            description\n                            path\n                            posts (filters: {tags:[\"" + tag + "\"]}) {\n                                edges {\n                                    node {\n                                        entityId\n                                        name\n                                        tags\n                                        htmlBody\n                                        plainTextSummary (characterLimit: 100)\n                                        author\n                                        path\n                                        thumbnailImage {\n                                            url (width: 100, height: 200)\n                                            urlOriginal\n                                            altText\n                                            isDefault\n                                        }\n                                        publishedDate {\n                                            utc\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        "
      })
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      return res.data;
    });
  }
  function formatUTCDate(utcDateString) {
    var date = new Date(utcDateString);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var day = date.getUTCDate();
    var month = months[date.getUTCMonth()];
    var year = date.getUTCFullYear();
    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }
    var dayWithSuffix = "" + day + getOrdinalSuffix(day);
    return dayWithSuffix + " " + month + " " + year;
  }
  function renderBlog(posts, tag) {
    $.each(posts, function (index, element) {
      if (index < 3) {
        var name = posts[index].node.name,
          url = posts[index].node.path;
        var thumbnail = '',
          summary = '',
          author = '';
        if (posts[index].node.thumbnailImage != null) {
          thumbnail = "<div class=\"item-image o-h b-r-32\">\n                                    <a class=\"halo-fadeZoom d-block b-r-32\" href=\"" + url + "\">\n                                        <img src=\"" + posts[index].node.thumbnailImage.urlOriginal + "\" alt=\"" + name + "\">                                    </a>\n                                </div>";
        } else {
          thumbnail = "<div class=\"item-image o-h b-r-32\">\n                                    <a class=\"halo-fadeZoom d-block b-r-32\" href=\"" + url + "\">\n                                        <img src=\"https://cdn11.bigcommerce.com/s-yrxgwbtfrf/stencil/1128bad0-7ffd-013d-26e0-56dd6728db26/img/placeholder-electronic.svg\" alt=\"" + name + "\">                                    </a>\n                                </div>";
        }
        if (posts[index].node.plainTextSummary != null) {
          summary = "<div class=\"summary f-root f-size-small-tb f-size-tiny-mb w-s-normal m-b-16 m-b-12-tb m-b-8-mb\">" + posts[index].node.plainTextSummary + " &hellip;</div>";
        }
        if (posts[index].node.author != null && posts[index].node.publishedDate != null) {
          author = "<p class=\"date color-secondary f-root f-size-small-tb f-size-tiny-mb m-b-16 m-b-12-tb m-b-8-mb\">Posted by " + posts[index].node.author + " on " + formatUTCDate(posts[index].node.publishedDate.utc) + "</p>";
        }
        var html = "<div class=\"item bg-white b-r-12 d-flex a-i-center w-100 hover-zoom pos-relative\" data-index=\"" + index + "\">\n                                <div class=\"content-left\">\n                                    " + thumbnail + "\n                                </div>\n                                <div class=\"content-right halo-fadeInUp\">\n                                    <h5 class=\"name pos-relative m-t-0 m-b-16 m-b-12-tb m-b-8-mb\"><a href=\"" + url + "\">" + name + "</a></h5>\n                                    " + author + "\n                                    " + summary + "\n                                    <a class=\"u-u u-p-u color-heading f-root f-size-small-tb f-size-tiny-mb\" href=\"" + url + "\">Read more</a>\n                                </div>\n                            </div>";
        $("[data-blog-tag=\"" + tag + "\"] .halo-block-content").append(html);
        if (index + 1 == posts.length) {
          $("[data-blog-tag=\"" + tag + "\"] .halo-block-content .loadingOverlay").remove();
          setTimeout(function () {
            $("[data-blog-tag=\"" + tag + "\"] .halo-block-content .item").addClass('animated');
          }, 100);
        }
      } else {
        $("[data-blog-tag=\"" + tag + "\"] .halo-block-content .loadingOverlay").remove();
        setTimeout(function () {
          $("[data-blog-tag=\"" + tag + "\"] .halo-block-content .item").addClass('animated');
        }, 100);
      }
    });
  }
  getPosts();
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9ibG9nX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBQ2M7QUFBQSxJQUVsQ0UsSUFBSSwwQkFBQUMsWUFBQTtFQUNyQixTQUFBRCxLQUFZRSxPQUFPLEVBQUU7SUFBQSxPQUNqQkQsWUFBQSxDQUFBRSxJQUFBLE9BQU1ELE9BQU8sQ0FBQztFQUNsQjtFQUFDRSxjQUFBLENBQUFKLElBQUEsRUFBQUMsWUFBQTtFQUFBLElBQUFJLE1BQUEsR0FBQUwsSUFBQSxDQUFBTSxTQUFBO0VBQUFELE1BQUEsQ0FFSkUsT0FBTyxHQUFQLFNBQUFBLE9BQU9BLENBQUEsRUFBRztJQUNIUixxRUFBYSxDQUFDLElBQUksQ0FBQ0csT0FBTyxDQUFDO0VBQy9CLENBQUM7RUFBQSxPQUFBRixJQUFBO0FBQUEsRUFQNkJGLHFEQUFXOzs7Ozs7Ozs7Ozs7Ozs7O0FDSDdDLDZCQUFlLG9DQUFTSSxPQUFPLEVBQUU7RUFDN0IsSUFBTU8sS0FBSyxHQUFHUCxPQUFPLENBQUNPLEtBQUs7RUFDM0IsSUFBSUMsU0FBUyxHQUFHQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7SUFDaENDLEdBQUc7RUFFUCxTQUFTQyxRQUFRQSxDQUFBLEVBQUc7SUFDaEIsSUFBSUMsQ0FBQyxHQUFHLENBQUM7SUFFVCxJQUFNQyxTQUFRLEdBQUcsU0FBWEEsUUFBUUEsQ0FBSUQsQ0FBQyxFQUFLO01BQ3BCRixHQUFHLEdBQUdGLFNBQVMsQ0FBQ00sRUFBRSxDQUFDRixDQUFDLENBQUMsQ0FBQ0csSUFBSSxDQUFDLGVBQWUsQ0FBQztNQUUzQ0MsT0FBTyxDQUFDTixHQUFHLENBQUMsQ0FBQ08sSUFBSSxDQUFDLFVBQUFDLElBQUksRUFBSTtRQUN0QkMsVUFBVSxDQUFDRCxJQUFJLENBQUNFLElBQUksQ0FBQ0MsT0FBTyxDQUFDQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0MsS0FBSyxFQUFFZCxHQUFHLENBQUM7UUFDbkQsSUFB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QUFDLFVBQVUsQ0FBQztVQUNoRixDQUFDLEVBQUUsR0FBRyxDQUFDO1FBQ1g7TUFDSixDQUFDLE1BQU07UUFDSDFELENBQUMsdUJBQW9CQyxHQUFHLDRDQUF3QyxDQUFDLENBQUN1RCxNQUFNLENBQUMsQ0FBQztRQUMxRUMsVUFBVSxDQUFDLFlBQU07VUFDYnpELENBQUMsdUJBQW9CQyxHQUFHLGtDQUE4QixDQUFDLENBQUN5RCxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ2hGLENBQUMsRUFBRSxHQUFHLENBQUM7TUFDWDtJQUNKLENBQUMsQ0FBQztFQUNOO0VBRUF4RCxRQUFRLENBQUMsQ0FBQztBQUNkIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vSGFsby8uL2Fzc2V0cy9qcy90aGVtZS9ibG9nLmpzIiwid2VicGFjazovL0hhbG8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvQmxvZ0J5VGFnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgaGFsb0Jsb2dCeVRhZyBmcm9tICcuL2hhbG90aGVtZXMvaGFsb0Jsb2dCeVRhZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb2cgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICB9XG5cblx0b25SZWFkeSgpIHtcbiAgICAgICAgaGFsb0Jsb2dCeVRhZyh0aGlzLmNvbnRleHQpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICBjb25zdCB0b2tlbiA9IGNvbnRleHQudG9rZW47XG4gICAgdmFyIGJsb2dibG9jayA9ICQoJ1tkYXRhLWJsb2ctdGFnXScpLFxuICAgICAgICB0YWc7XG5cbiAgICBmdW5jdGlvbiBnZXRQb3N0cygpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICAgIGNvbnN0IGxvYWRCbG9nID0gKGkpID0+IHtcbiAgICAgICAgICAgIHRhZyA9IGJsb2dibG9jay5lcShpKS5hdHRyKCdkYXRhLWJsb2ctdGFnJyk7XG5cbiAgICAgICAgICAgIGdldEJsb2codGFnKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHJlbmRlckJsb2coZGF0YS5zaXRlLmNvbnRlbnQuYmxvZy5wb3N0cy5lZGdlcywgdGFnKTtcbiAgICAgICAgICAgICAgICBpZiAoaSsxIDwgYmxvZ2Jsb2NrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRCbG9nKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxvYWRCbG9nKGkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJsb2codGFnKSB7XG4gICAgICAgIHJldHVybiBmZXRjaCgnL2dyYXBocWwnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBxdWVyeTogYFxuICAgICAgICAgICAgcXVlcnkgTXlRdWVyeSB7XG4gICAgICAgICAgICAgICAgc2l0ZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvZyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RzIChmaWx0ZXJzOiB7dGFnczpbXCJgK3RhZytgXCJdfSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbEJvZHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFpblRleHRTdW1tYXJ5IChjaGFyYWN0ZXJMaW1pdDogMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWFnZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCAod2lkdGg6IDEwMCwgaGVpZ2h0OiAyMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybE9yaWdpbmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNEZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hlZERhdGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIGB9KSxcbiAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFVUQ0RhdGUodXRjRGF0ZVN0cmluZykge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodXRjRGF0ZVN0cmluZyk7XG4gICAgXG4gICAgICAgIGNvbnN0IG1vbnRocyA9IFtcbiAgICAgICAgICAgIFwiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsXG4gICAgICAgICAgICBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXG4gICAgICAgIF07XG4gICAgXG4gICAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICBjb25zdCBtb250aCA9IG1vbnRoc1tkYXRlLmdldFVUQ01vbnRoKCldO1xuICAgICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgIFxuICAgICAgICBmdW5jdGlvbiBnZXRPcmRpbmFsU3VmZml4KGRheSkge1xuICAgICAgICAgICAgaWYgKGRheSA+IDMgJiYgZGF5IDwgMjEpIHJldHVybiBcInRoXCI7XG4gICAgICAgICAgICBzd2l0Y2ggKGRheSAlIDEwKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gXCJzdFwiO1xuICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFwibmRcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBcInJkXCI7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwidGhcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBkYXlXaXRoU3VmZml4ID0gYCR7ZGF5fSR7Z2V0T3JkaW5hbFN1ZmZpeChkYXkpfWA7XG4gICAgXG4gICAgICAgIHJldHVybiBgJHtkYXlXaXRoU3VmZml4fSAke21vbnRofSAke3llYXJ9YDtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcmVuZGVyQmxvZyhwb3N0cywgdGFnKSB7XG4gICAgICAgICQuZWFjaChwb3N0cywgKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBwb3N0c1tpbmRleF0ubm9kZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICB1cmwgPSBwb3N0c1tpbmRleF0ubm9kZS5wYXRoO1xuXG4gICAgICAgICAgICAgICAgbGV0IHRodW1ibmFpbCA9ICcnLFxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5ID0gJycsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvciA9ICcnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBvc3RzW2luZGV4XS5ub2RlLnRodW1ibmFpbEltYWdlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsID0gYDxkaXYgY2xhc3M9XCJpdGVtLWltYWdlIG8taCBiLXItMzJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiaGFsby1mYWRlWm9vbSBkLWJsb2NrIGItci0zMlwiIGhyZWY9XCIke3VybH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7cG9zdHNbaW5kZXhdLm5vZGUudGh1bWJuYWlsSW1hZ2UudXJsT3JpZ2luYWx9XCIgYWx0PVwiJHtuYW1lfVwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsID0gYDxkaXYgY2xhc3M9XCJpdGVtLWltYWdlIG8taCBiLXItMzJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiaGFsby1mYWRlWm9vbSBkLWJsb2NrIGItci0zMlwiIGhyZWY9XCIke3VybH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vY2RuMTEuYmlnY29tbWVyY2UuY29tL3MteXJ4Z3didGZyZi9zdGVuY2lsLzExMjhiYWQwLTdmZmQtMDEzZC0yNmUwLTU2ZGQ2NzI4ZGIyNi9pbWcvcGxhY2Vob2xkZXItZWxlY3Ryb25pYy5zdmdcIiBhbHQ9XCIke25hbWV9XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocG9zdHNbaW5kZXhdLm5vZGUucGxhaW5UZXh0U3VtbWFyeSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnkgPSBgPGRpdiBjbGFzcz1cInN1bW1hcnkgZi1yb290IGYtc2l6ZS1zbWFsbC10YiBmLXNpemUtdGlueS1tYiB3LXMtbm9ybWFsIG0tYi0xNiBtLWItMTItdGIgbS1iLTgtbWJcIj4ke3Bvc3RzW2luZGV4XS5ub2RlLnBsYWluVGV4dFN1bW1hcnl9ICZoZWxsaXA7PC9kaXY+YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocG9zdHNbaW5kZXhdLm5vZGUuYXV0aG9yICE9IG51bGwgJiYgcG9zdHNbaW5kZXhdLm5vZGUucHVibGlzaGVkRGF0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGF1dGhvciA9IGA8cCBjbGFzcz1cImRhdGUgY29sb3Itc2Vjb25kYXJ5IGYtcm9vdCBmLXNpemUtc21hbGwtdGIgZi1zaXplLXRpbnktbWIgbS1iLTE2IG0tYi0xMi10YiBtLWItOC1tYlwiPlBvc3RlZCBieSAke3Bvc3RzW2luZGV4XS5ub2RlLmF1dGhvcn0gb24gJHtmb3JtYXRVVENEYXRlKHBvc3RzW2luZGV4XS5ub2RlLnB1Ymxpc2hlZERhdGUudXRjKX08L3A+YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBodG1sID0gYDxkaXYgY2xhc3M9XCJpdGVtIGJnLXdoaXRlIGItci0xMiBkLWZsZXggYS1pLWNlbnRlciB3LTEwMCBob3Zlci16b29tIHBvcy1yZWxhdGl2ZVwiIGRhdGEtaW5kZXg9XCIke2luZGV4fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3RodW1ibmFpbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LXJpZ2h0IGhhbG8tZmFkZUluVXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzcz1cIm5hbWUgcG9zLXJlbGF0aXZlIG0tdC0wIG0tYi0xNiBtLWItMTItdGIgbS1iLTgtbWJcIj48YSBocmVmPVwiJHt1cmx9XCI+JHtuYW1lfTwvYT48L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHthdXRob3J9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3N1bW1hcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInUtdSB1LXAtdSBjb2xvci1oZWFkaW5nIGYtcm9vdCBmLXNpemUtc21hbGwtdGIgZi1zaXplLXRpbnktbWJcIiBocmVmPVwiJHt1cmx9XCI+UmVhZCBtb3JlPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXG5cbiAgICAgICAgICAgICAgICAkKGBbZGF0YS1ibG9nLXRhZz1cIiR7dGFnfVwiXSAuaGFsby1ibG9jay1jb250ZW50YCkuYXBwZW5kKGh0bWwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA9PSBwb3N0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgJChgW2RhdGEtYmxvZy10YWc9XCIke3RhZ31cIl0gLmhhbG8tYmxvY2stY29udGVudCAubG9hZGluZ092ZXJsYXlgKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKGBbZGF0YS1ibG9nLXRhZz1cIiR7dGFnfVwiXSAuaGFsby1ibG9jay1jb250ZW50IC5pdGVtYCkuYWRkQ2xhc3MoJ2FuaW1hdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGBbZGF0YS1ibG9nLXRhZz1cIiR7dGFnfVwiXSAuaGFsby1ibG9jay1jb250ZW50IC5sb2FkaW5nT3ZlcmxheWApLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkKGBbZGF0YS1ibG9nLXRhZz1cIiR7dGFnfVwiXSAuaGFsby1ibG9jay1jb250ZW50IC5pdGVtYCkuYWRkQ2xhc3MoJ2FuaW1hdGVkJyk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0UG9zdHMoKVxufVxuIl0sIm5hbWVzIjpbIlBhZ2VNYW5hZ2VyIiwiaGFsb0Jsb2dCeVRhZyIsIkJsb2ciLCJfUGFnZU1hbmFnZXIiLCJjb250ZXh0IiwiY2FsbCIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwib25SZWFkeSIsImRlZmF1bHQiLCJ0b2tlbiIsImJsb2dibG9jayIsIiQiLCJ0YWciLCJnZXRQb3N0cyIsImkiLCJsb2FkQmxvZyIsImVxIiwiYXR0ciIsImdldEJsb2ciLCJ0aGVuIiwiZGF0YSIsInJlbmRlckJsb2ciLCJzaXRlIiwiY29udGVudCIsImJsb2ciLCJwb3N0cyIsImVkZ2VzIiwibGVuZ3RoIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJxdWVyeSIsInJlcyIsImpzb24iLCJmb3JtYXRVVENEYXRlIiwidXRjRGF0ZVN0cmluZyIsImRhdGUiLCJEYXRlIiwibW9udGhzIiwiZGF5IiwiZ2V0VVRDRGF0ZSIsIm1vbnRoIiwiZ2V0VVRDTW9udGgiLCJ5ZWFyIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRPcmRpbmFsU3VmZml4IiwiZGF5V2l0aFN1ZmZpeCIsImVhY2giLCJpbmRleCIsImVsZW1lbnQiLCJuYW1lIiwibm9kZSIsInVybCIsInBhdGgiLCJ0aHVtYm5haWwiLCJzdW1tYXJ5IiwiYXV0aG9yIiwidGh1bWJuYWlsSW1hZ2UiLCJ1cmxPcmlnaW5hbCIsInBsYWluVGV4dFN1bW1hcnkiLCJwdWJsaXNoZWREYXRlIiwidXRjIiwiaHRtbCIsImFwcGVuZCIsInJlbW92ZSIsInNldFRpbWVvdXQiLCJhZGRDbGFzcyJdLCJzb3VyY2VSb290IjoiIn0=