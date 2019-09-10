const { default: hotkeys } = require('hotkeys-js');

let isRecording = false;
let mediaType;

function init({
  videoKey = 'ctrl+r',
  screenshotKey = 'ctrl+s',
  description: descriptionCallback,
} = {}) {
  hotkeys(videoKey, function(event, handler) {
    if (isRecording) {
      stopCapture();
    } else {
      startCapture('video');
    }
  });

  hotkeys(screenshotKey, async function(event, handler) {
    await startCapture('image');
    setTimeout(async () => {
      const img = getVideoImage(0);
      if (img.src === 'data:,') return;
      stopCapture('image');
      const res = await fetch(img.src);
      const blob = await res.blob();
      upload(blob);
    }, 1000);
  });

  let recorder;
  let stream;
  let chunks = [];
  const video = document.createElement('video');
  video.setAttribute('autoplay', true);

  document.addEventListener('DOMContentLoaded', () => {
    // document.body.appendChild(video)
  });

  function stopCapture(evt) {
    if (!isRecording) return;
    isRecording = false;
    if (recorder) {
      recorder.stop();
      recorder = null;
      stream.getTracks().forEach(track => track.stop());
      stream = null;
      chunks = [];
      if (mediaType === 'video') {
        // window.onbeforeunload = null;
      }
    }
  }

  function handleCloseBanner() {
    const banner = document.getElementById('uxshot-banner');
    banner.remove();
  }

  async function upload(data) {
    // Build formData object.
    let formData = new FormData();
    formData.append('mediaType', mediaType);
    formData.append('media', data);

    let description;
    if (descriptionCallback) {
      description = await descriptionCallback();
      formData.append('description', description);
    }

    // const res = await fetch("http://localhost:3000/upload",
    const res = await fetch('https://uxshot.com/upload', {
      body: formData,
      method: 'post',
    });

    const json = await res.json();

    const url = json.data.url;

    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {}

    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('readonly', true);
    input.value = url;
    Object.assign(input.style, {
      borderRadius: '3px',
      outline: 'none',
      border: 'none',
      width: '150px',
      marginRight: '5px',
    });

    const copyButton = document.createElement('button');
    copyButton.innerHTML = 'Copy';
    Object.assign(copyButton.style, {});

    const banner = document.createElement('div');
    banner.id = 'uxshot-banner';
    Object.assign(banner.style, {
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'white',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      padding: '10px 15px',
      padding: '10px 15px',
      border: '1px solid #cacaca',
    });

    copyButton.addEventListener('click', () => {
      input.select();
      document.execCommand('copy');
      banner.remove();
    });

    const closeButton = document.createElement('button');
    closeButton.addEventListener('click', handleCloseBanner);
    closeButton.innerHTML = '&times;';
    Object.assign(closeButton.style, {
      background: 'transparent',
      color: 'white',
      border: 'none',
      fontSize: '14px',
      marginLeft: '5px',
    });

    banner.appendChild(input);
    banner.appendChild(copyButton);
    // banner.appendChild(closeButton);

    document.body.appendChild(banner);
  }

  function screenCap() {
    if (navigator.getDisplayMedia) {
      return navigator.getDisplayMedia({ video: true, audio: true });
    } else if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getDisplayMedia
    ) {
      return navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
    } else {
      throw new Error('getDisplayMedia API is not supported in this browser');
    }
  }

  async function startCapture(type) {
    const banner = document.getElementById('uxshot-banner');
    if (banner) banner.remove();

    mediaType = type;
    isRecording = true;

    if (mediaType === 'video') {
      // window.onbeforeunload = function(evt) {
      //   // Cancel the event
      //   evt.preventDefault();
      //   // Chrome requires returnValue to be set
      //   evt.returnValue = '';
      // };
    }

    try {
      stream = await screenCap();
      const track = stream.getTracks()[0];
      const settings = track.getSettings && track.getSettings();
      if (!settings.displaySurface || settings.displaySurface === 'monitor') {
        // window.open(window.location.href)
      }
      video.srcObject = stream;

      const mimeType = 'video/webm; codecs=vp8';
      recorder = new MediaRecorder(stream, { mimeType });
      recorder.ondataavailable = function(event) {
        if (typeof event.data === 'undefined') return;
        if (event.data.size === 0) return;
        chunks.push(event.data);
      };
      recorder.addEventListener('stop', () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        if (mediaType === 'video') {
          upload(blob);
        }
      });

      recorder.addEventListener('start', () => {
        // upload();
      });
      recorder.start();

      stream.addEventListener('inactive', e => {
        if (isRecording && mediaType === 'video') {
          stopCapture();
        }
      });

      stream.addEventListener('active', e => {
        // callback();
        // console.log('active');
      });
      stream.addEventListener('addtrack', e => {
        // console.log('add');
        // callback();
      });
    } catch (err) {
      console.error(err);
    }
  }

  function getVideoImage(secs) {
    video.currentTime = secs;
    const canvas = document.createElement('canvas');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
  }
}

module.exports = init;
