export type Post = {
  id?: number;
  createdAt?: string;
  title: string;
  tags: string[];
  content: string;
  private: boolean;
};
