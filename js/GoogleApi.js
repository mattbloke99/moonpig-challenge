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

/*
 *  Strips out unnecessary data from books array
 *  Returns Array of objects - {title, authors, description, thumbnail}
 */
function transformData(data) {
  return data.map((item) => {
    const { title, authors, description, imageLinks } = item.volumeInfo;
    // Check if thumbnail exists
    let thumbnail;
    if (imageLinks) {
      thumbnail = imageLinks.thumbnail;
    }
    // Concatenate authors if they are present
    if (authors) {
      authors.join(', ');
    }

    return {
      title,
      authors,
      description,
      thumbnail,
    };
  });
};
