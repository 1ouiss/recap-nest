export class QueriesAdvertDto {
  query: string;
  min_price?: number;
  max_price?: number;
  min_nb_rooms?: number;
  max_nb_rooms?: number;
  min_square_meters?: number;
  max_square_meters?: number;
  order?: 'DESC' | 'ASC';
  order_by?: 'price' | 'nb_rooms' | 'square_meters' | 'created_at';
}
