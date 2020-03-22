'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var STATUS_CODE_OK = 200;
  var URL = 'https://js.dump.academy/keksobooking';

  var setup = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        loadHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (loadHandler, errorHandler) {
    var xhr = setup(loadHandler, errorHandler);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var save = function (data, loadHandler, errorHandler) {
    var xhr = setup(loadHandler, errorHandler);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
