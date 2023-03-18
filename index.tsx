import React, {
  createContext,
  CSSProperties,
  FC,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Property } from 'csstype';
import debounce from 'lodash.debounce';

interface IImageBookContext {
  initialPage: number;
  scrollRef: RefObject<HTMLDivElement>;
  imageUrls: string[];
  currentPageIndex: number;
}

const ImageBookContext = createContext<IImageBookContext>({
  initialPage: 0,
  scrollRef: { current: null },
  imageUrls: [],
  currentPageIndex: 0,
});

const Layout = () => {
  const { imageUrls, currentPageIndex, scrollRef } =
    useContext(ImageBookContext);
  const [showLayout, setShowLayout] = useState(true);

  useEffect(() => {
    if (!showLayout) {
      return;
    }

    debounce(() => {
      setShowLayout(false);
    }, 2000)();
  }, [showLayout]);

  useEffect(() => {
    const showLayoutHandler = () => {
      setShowLayout(true);
    };
    scrollRef.current?.addEventListener('scroll', showLayoutHandler);
    return () =>
      scrollRef.current?.removeEventListener('scroll', showLayoutHandler);
  }, [scrollRef]);

  return (
    <div
      style={{
        opacity: showLayout ? 1 : 0,
        transition: 'opacity',
        transitionDuration: '500ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0. 0.2. 1)',
        position: 'absolute',
        transform: 'translateX(-50%)',
        left: '50%',
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        backgroundColor: 'rgba(255, 255, 255, .5)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <span>
        {currentPageIndex} / {imageUrls.length}
      </span>
    </div>
  );
};

const ImagesRender = () => {
  const { initialPage, scrollRef, imageUrls } = useContext(ImageBookContext);
  const [imageLoadCount, setImageLoadCount] = useState(0);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    const children = Array.from(scrollRef.current.children);
    let scrollTo = 0;
    for (let i = 0; i < initialPage - 1; i++) {
      scrollTo += children[i].clientHeight;
    }

    scrollRef.current.scroll({
      top: scrollTo,
      behavior: 'smooth',
    });
  }, [scrollRef, imageLoadCount]);

  return (
    <div
      ref={scrollRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'scroll',
      }}
    >
      {imageUrls.map((url, i) => (
        <img
          key={i}
          style={{ width: '100%' }}
          src={url}
          onLoad={() => setImageLoadCount((c) => c + 1)}
        />
      ))}
    </div>
  );
};

export type ImageBookProps = {
  imageUrls: string[];
  initialPage?: number;
  onPageChange?: (pageIndex: number) => void;
  width?: Property.Width<string | number>;
  height?: Property.Height<string | number>;
};

const ImageBook: FC<ImageBookProps> = ({
  imageUrls,
  initialPage = 1,
  onPageChange = () => {},
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentPageIndex, setPageIndex] = useState(initialPage);

  useEffect(() => {
    onPageChange(currentPageIndex);
  }, [currentPageIndex]);

  useEffect(() => {
    const scrollHandler = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }

      const scrollTop = e.target.scrollTop;
      const scrollHeight = e.target.scrollHeight;
      const clientHeight = e.target.clientHeight;

      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      let scrollDistance = scrollTop + clientHeight * scrollPercentage;
      let pageIndex = 0;
      for (const image of Array.from(e.target.children)) {
        scrollDistance -= image.clientHeight;
        pageIndex += 1;
        if (scrollDistance <= 0) {
          break;
        }
      }

      setPageIndex(pageIndex);
    };

    ref.current?.addEventListener('scroll', scrollHandler);
    return () => ref.current?.removeEventListener('scroll', scrollHandler);
  }, [ref]);

  const style: CSSProperties = {
    ...props,
    position: 'relative',
  };

  return (
    <ImageBookContext.Provider
      value={{
        initialPage,
        imageUrls,
        currentPageIndex,
        scrollRef: ref,
      }}
    >
      <div style={style}>
        <Layout />
        <ImagesRender />
      </div>
    </ImageBookContext.Provider>
  );
};

export default ImageBook;
