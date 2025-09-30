export default function dataURLtoFile(dataUrl, filename) {
  // Split into "data:[mime];base64," and the actual base64 data
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1]; // extract mime type
  const bstr = atob(arr[1]); // decode base64 string
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
