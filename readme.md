# uxshot

Create and share screenshots and screen recordings right from your browser.

## Usage

```
import uxshot from 'uxshot';
uxshot();
```

Take a screenshot: `ctrl+s`

Record your screen: `ctrl+r`

### Options

```
uxshot({
  screenshotKey: 'ctrl+s',
  videoKey: 'ctrl+r'
});
```

Use any hotkey string supported by [HotKeys.js](https://wangchujiang.com/hotkeys)