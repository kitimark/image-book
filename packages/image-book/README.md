# Image book
Images previewer look like pdf reader

# Demo
- [Codesandbox](https://codesandbox.io/s/image-book-example-nj7fg9?file=/src/App.js)

# Installation
```sh
# npm
npm install image-book

# yarn
yarn add image-book
```

# Usage
```javascript
import ImageBook from 'image-book';

const pdfImages = [
  'pdfimages/bitcoin-1.jpg',
  'pdfimages/bitcoin-2.jpg',
  'pdfimages/bitcoin-3.jpg',
  'pdfimages/bitcoin-4.jpg',
  'pdfimages/bitcoin-5.jpg',
  'pdfimages/bitcoin-6.jpg',
  'pdfimages/bitcoin-7.jpg',
  'pdfimages/bitcoin-8.jpg',
  'pdfimages/bitcoin-9.jpg',
];

const ImagePreviewer = () => {
  return (
    <div>
      <ImageBook
        imageUrls={pdfImages}
        initialPage={1}
        width="100%"
        height="75vh"
      />
    </div>
  )
}
```