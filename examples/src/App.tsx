import React, { useMemo } from 'react';
import ImageBook from 'image-book';
import styled from '@emotion/styled';

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

const Container = styled('div')(() => ({
  '@media (min-width: 768px)': {
    width: '50vw'
  }
}))

const App = () => {
  const initialPageIndex = useMemo(() => {
    return Number(localStorage.getItem(currentPageIndexKey)) || 1;
  }, []);

  const pageChangeHandler = (pageIndex: number) => {
    localStorage.setItem(currentPageIndexKey, String(pageIndex));
  };

  return (
    <Container>
      <h1>Image Book Demo</h1>
      <ImageBook
        imageUrls={pdfImages}
        initialPage={initialPageIndex}
        onPageChange={pageChangeHandler}
        width="100%"
        height="75vh"
      />
    </Container>
  );
};

export default App;
