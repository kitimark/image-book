import React, { useMemo } from 'react';
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

const currentPageIndexKey = 'currentPageIndex';

const App = () => {
  const initialPageIndex = useMemo(() => {
    return Number(localStorage.getItem(currentPageIndexKey)) || 1;
  }, []);

  const pageChangeHandler = (pageIndex: number) => {
    localStorage.setItem(currentPageIndexKey, String(pageIndex));
  };

  return (
    <div>
      <h1>Image Book Demo</h1>
      <ImageBook
        imageUrls={pdfImages}
        initialPage={initialPageIndex}
        onPageChange={pageChangeHandler}
        width="50vw"
        height="80vh"
      />
    </div>
  );
};

export default App;
