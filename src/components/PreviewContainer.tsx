import { useState, useEffect, useRef, useCallback, memo } from "react";
import { ResumeData, TemplateName } from "@/utils/resumeTypes";
import ResumePreview from "./ResumePreview";
import PageIndicator from "./PageIndicator";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const PAGE_GAP = 32;

interface Props {
  data: ResumeData;
  template: TemplateName;
}

const PreviewContainer = memo(({ data, template }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.75);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate scale based on container width
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const padding = 80;
        const availableWidth = containerWidth - padding;
        const newScale = Math.min(availableWidth / A4_WIDTH, 0.92);
        setScale(Math.max(newScale, 0.35));
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Calculate total pages from content height
  useEffect(() => {
    const checkPages = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const pages = Math.max(1, Math.ceil(contentHeight / A4_HEIGHT));
        setTotalPages(pages);
      }
    };
    checkPages();
    const observer = new MutationObserver(checkPages);
    if (contentRef.current) {
      observer.observe(contentRef.current, { childList: true, subtree: true, characterData: true });
    }
    return () => observer.disconnect();
  }, [data, template]);

  // Track current page based on scroll position
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const scaledPageWithGap = A4_HEIGHT * scale + PAGE_GAP;
      const page = Math.floor((scrollTop + scaledPageWithGap * 0.5) / scaledPageWithGap) + 1;
      setCurrentPage(Math.min(Math.max(1, page), totalPages));
    }
  }, [scale, totalPages]);

  const scrollToPage = useCallback((page: number) => {
    if (scrollRef.current) {
      const scaledPageWithGap = A4_HEIGHT * scale + PAGE_GAP;
      scrollRef.current.scrollTo({
        top: (page - 1) * scaledPageWithGap,
        behavior: "smooth",
      });
    }
  }, [scale]);

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div ref={containerRef} className="relative flex-1 flex flex-col min-h-0">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ backgroundColor: "hsl(var(--muted) / 0.5)" }}
      >
        <div className="flex flex-col items-center py-8 sm:py-10 px-4 sm:px-5">
          {pages.map((pageIndex) => {
            const scaledHeight = A4_HEIGHT * scale;
            return (
              <div
                key={pageIndex}
                style={{
                  width: `${A4_WIDTH * scale}px`,
                  height: `${scaledHeight}px`,
                  marginBottom: pageIndex < totalPages - 1 ? `${PAGE_GAP}px` : 0,
                }}
                className="shrink-0 relative"
              >
                <div
                  className="bg-white overflow-hidden absolute top-0 left-0"
                  style={{
                    width: `${A4_WIDTH}px`,
                    height: `${A4_HEIGHT}px`,
                    borderRadius: "6px",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <div
                    ref={pageIndex === 0 ? contentRef : undefined}
                    style={{
                      transform: `translateY(${-pageIndex * A4_HEIGHT}px)`,
                    }}
                  >
                    <ResumePreview data={data} template={template} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Page indicator */}
      {totalPages > 1 && (
        <PageIndicator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={scrollToPage}
        />
      )}
    </div>
  );
});

PreviewContainer.displayName = "PreviewContainer";

export default PreviewContainer;
