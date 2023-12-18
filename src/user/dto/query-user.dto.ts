export class QueriesUserDto {
  query: string;
  name?: string;
  order?: 'DESC' | 'ASC';
  order_by?: 'name' | 'createdAt';
  per_page?: number;
  page?: number;
}
