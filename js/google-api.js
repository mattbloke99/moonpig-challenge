/*
 *  Returns Thumbnail Url || '' from a volumeInfo obj
 */
function getThumbnailFromVolumeInfo(volumeInfo) {
  const { imageLinks } = volumeInfo;
  if (imageLinks) {
    const { thumbnail } = imageLinks;
    return thumbnail ? thumbnail : '';
  }
  return '';
}

/*
 *  Returns concatenated list of authors || '' from a volumeInfo obj
 */
function getAuthorsFromVolumeInfo(volumeInfo) {
  const { authors } = volumeInfo;
  if (authors) {
    return authors.join(', ');
  }
  return '';
}

/*
 *  Strips out unnecessary data from books array
 *  Returns Array of objects - {title, authors, description, thumbnail}
 */
function transformData(data) {
  return data.map((item) => {
    const { title, description } = item.volumeInfo;
    const thumbnail = getThumbnailFromVolumeInfo(item.volumeInfo);
    const authors = getAuthorsFromVolumeInfo(item.volumeInfo);

    return {
      title,
      authors,
      description,
      thumbnail,
    };
  });
};

/*
 *  Makes call to Google Books API
 *  Inputs - string containing search phrase
 *  Returns Promise
 */
export default function getBooks(phrase) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${phrase}&maxResults=20&orderBy=newest&key=AIzaSyC8j98w0W46EB3BOSxmIg0KWIo-F5xFku0`;
  // Return new promise
  return new Promise((resolve, reject) =>{
    // Make XHR request
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
      // This is called even on 404 so check the status
      if (req.status === 200) {

        const responseJSONData = JSON.parse(req.response);
        const books = transformData(responseJSONData.items);
        resolve(books);
      } else {
        // Otherwise reject
        reject(Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(Error('Network Error'));
    };

    // Make the request
    req.send();
  });
};
