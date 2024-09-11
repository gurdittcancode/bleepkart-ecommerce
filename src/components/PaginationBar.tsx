import Link from 'next/link';
import { FC, Fragment } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

const PaginationBar: FC<PaginationBarProps> = ({ currentPage, totalPages }) => {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const pageNumbers: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; ++page) {
    pageNumbers.push(
      <PaginationItem>
        <PaginationLink href={`?page=${page}`} isActive={page === currentPage}>
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <Fragment>
      <Pagination className="hidden sm:flex mt-12">
        <PaginationContent>{pageNumbers}</PaginationContent>
      </Pagination>
      <Pagination className="block sm:hidden">
        <PaginationContent>
          <PaginationPrevious
            href={`?page=${currentPage > 1 ? currentPage - 1 : '#'}`}
          />
          <PaginationItem>
            <PaginationLink href={`?page=${currentPage}`} isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationNext
            href={`?page=${currentPage === maxPage ? '#' : currentPage + 1}`}></PaginationNext>
        </PaginationContent>
      </Pagination>
    </Fragment>
  );
};

export default PaginationBar;
