export interface ResultPageModel<T> {
  totalPages?: number;
  totalElements?: number;
  numberOfElements?: number;
  sort?: Sort;
  first?: boolean;
  last?: boolean;
  size?: number;
  content?: T[];
  pageable?: Pageable;
  empty?: boolean;
}

export interface Sort {
  sorted?: boolean;
  unsorted?: boolean;
  empty?: boolean;
}

export interface Pageable {
  sort?: Sort;
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  unpaged?: boolean;
}
