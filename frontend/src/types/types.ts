export type ProductType = {
  id?: number | string;
  name: string;
  builder: string;
  caption: string;
  cover: string;
  alt: string;
  slug: string;
  rate: number;
  price: number;
  offerPrice?: number;
  offer?: number;
  category?: string;
};

export type CommentType = {
  id: string | number;
  comment: string;
  rate: number;
  user: {
    cover: string;
    name: string;
  };
};
