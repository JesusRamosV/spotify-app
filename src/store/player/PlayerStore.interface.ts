export interface PlayerProps {
  id: string;
  name: string;
  artists: string;
  image: string;
  volume?: number;
  pausing?: boolean;
}
