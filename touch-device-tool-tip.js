/*****************************************
  *----------------------------------
  |  ThisScriptVersion: 1.1.0     |
  |  © 2026 By ISAMI ABE          |
  |  LastUpdate: 2026-10-06       |
  |  License: MIT License         |
  |  touch-device-tool-tip (ES5 only) |
----------------------------------*
  IEのような古いブラウザでも動作するよう、意図的にES5構文のみで書く
  (const/let、アロー関数、Element.prototype.closest/removeは使用しない)。
******************************************/
window.addEventListener("DOMContentLoaded", function() {
  // スマホでのtitle属性
  var tooltipTimer;
  var tooltipElement;

  // 長押し判定に使う時間（ミリ秒）
  var LONG_PRESS_DURATION = 500;

  // Element.prototype.closest()はIEで使えないため、同等の処理を手動で行う
  function findClosestWithTitle(el) {
    while (el && el.nodeType === 1) {
      if (el.hasAttribute && el.hasAttribute('title')) {
        return el;
      }
      el = el.parentNode;
    }
    return null;
  }

  document.body.addEventListener('touchstart', function (event) {
    var target = findClosestWithTitle(event.target);
    if (!target) return;
    // タッチイベントが始まったら、長押し判定を開始
    tooltipTimer = setTimeout(function () {
      showTooltip(target);
    }, LONG_PRESS_DURATION);
  });

  document.body.addEventListener('touchend', function () {
    clearTimeout(tooltipTimer);
    hideTooltip();
  });

  document.body.addEventListener('touchcancel', function () {
    clearTimeout(tooltipTimer);
    hideTooltip();
  });

  function showTooltip(element) {
    var titleText = element.getAttribute('title');
    if (!titleText) return;

    // ツールチップの生成
    tooltipElement = document.createElement('div');
    tooltipElement.textContent = titleText;

    // スタイルの直接指定
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.backgroundColor = 'black';
    tooltipElement.style.color = 'white';
    tooltipElement.style.padding = '5px 10px';
    tooltipElement.style.borderRadius = '5px';
    tooltipElement.style.fontSize = '14px';
    tooltipElement.style.pointerEvents = 'none';
    tooltipElement.style.zIndex = '1000';
    tooltipElement.style.maxWidth = '95vw';
    tooltipElement.style.opacity = '0'; // 最初は透明にしておく
    tooltipElement.style.transition = 'opacity 0.2s'; // フェードイン効果

    document.body.appendChild(tooltipElement);

    // ツールチップの位置を調整
    var rect = element.getBoundingClientRect();
    tooltipElement.style.top = rect.top + window.scrollY - tooltipElement.offsetHeight - 10 + 'px';
    tooltipElement.style.left = rect.left + window.scrollX + (rect.width / 2) - (tooltipElement.offsetWidth / 2) + 'px';

    // 少し遅れてツールチップを表示（フェードイン）
    requestAnimationFrame(function () {
      tooltipElement.style.opacity = '1';
    });
  }

  function hideTooltip() {
    if (tooltipElement) {
      // フェードアウト効果
      tooltipElement.style.opacity = '0';

      // フェードアウト完了後に削除(Element.prototype.removeはIEに無いためremoveChildを使う)
      setTimeout(function () {
        if (tooltipElement) {
          if (tooltipElement.parentNode) {
            tooltipElement.parentNode.removeChild(tooltipElement);
          }
          tooltipElement = null;
        }
      }, 200); // フェードアウトに合わせたタイミング
    }
  }
});
