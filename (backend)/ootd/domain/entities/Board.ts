interface Board {
  id: number;
  text: string;
  feels_like: number;
  date_created: string;
  user_id: number;
  season: string;
  photos?: { img_url: string }[];
}

export default Board;
