# uxshot

Create and share screenshots and screen recordings right from your browser.

## Usage as an npm module

```
import uxshot from 'uxshot';
uxshot({
  screenshotKey: 'ctrl+s',
  videoKey: 'ctrl+r'
});
```

Take a screenshot: `ctrl+s`

Record your screen: `ctrl+r`

## Usage from a cdn

You need to include hotkeys-js and ux shot:

```html
<script src="https://unpkg.com/hotkeys-js/dist/hotkeys.min.js"></script>
<script src="https://unpkg.com/uxshot"></script>

<script>
  window.uxshot.init({
    screenshotKey: 'ctrl+s',
    videoKey: 'ctrl+r'
  });
</script>
```


### Options

```
uxshot({
  screenshotKey: 'ctrl+s',
  videoKey: 'ctrl+r'
});
```

Use any hotkey string supported by [HotKeys.js](https://wangchujiang.com/hotkeys)
