 // async/promise function for retrieving image dimensions for a URL
export const getImageSize = (url) => {
    const imgElement = document.createElement("img");
    const promise = new Promise((resolve, reject) => {
          imgElement.onload = () => {
          // Natural size is the actual image size regardless of rendering.
          // The 'normal' `width`/`height` are for the **rendered** size.
          const width  = imgElement.naturalWidth;
          const height = imgElement.naturalHeight; 
    
          // Resolve promise with the width and height
          resolve({width, height});
    };

    // Reject promise on error
    imgElement.onerror = reject;
    });

    // Setting the source makes it start downloading and eventually call `onload`
    imgElement.src = url;

    return promise;
}