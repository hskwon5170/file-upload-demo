export type FileWithProgress = {
  file: File;
  progress?: number;
  status: "uploading" | "done" | "error";
  id: number;
  isError?: boolean;
};

export type ProgressAtomProps = {
  id: number;
  progress: number;
};

export type FileDto = {
  id: number;
  url: string | null;
  originalName: string;
  extensionType: string;
  uuid: string;
  height: number;
  width: number;
  fileCollection: any | null;
  displayUrl: string;
  indexStatus: string;
  highlightCoordinate: any | null;
};

type Pageable = {
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
};

type FilesResponse = {
  content: File[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};
