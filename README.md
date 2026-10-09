# touch-device-tool-tip

スマートフォンなどのタッチ端末では表示されない `title` 属性のツールチップを、長押しで表示できるようにするスクリプトです。

古いブラウザ(IE など)でも動くよう、ES5 の構文だけで書いています。

## 使い方

```html
<a href="#" title="ここに説明が出ます">長押ししてみてください</a>
<script src="touch-device-tool-tip.js"></script>
```

読み込むだけで、`title` 属性を持つ要素を 0.5 秒長押しするとツールチップが表示されます。

## ライセンス

[MIT License](LICENSE) © 2026 ISAMI ABE
