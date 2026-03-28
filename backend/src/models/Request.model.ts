export type Request = {
  id: number;
  created: Date;
  type: RequestType;
};

export type RequestType =
  | 'all'
  | 'moreThanFiveWords'
  | 'lessOrEqualToFiveWords';
