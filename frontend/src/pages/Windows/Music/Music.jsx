import SpotifyWebPlayer from "react-spotify-web-playback";
import { useAuth } from "../../../contexts/AuthContext";

export default function Music() {
  const { spotifyToken } = useAuth();
  return (
    <div>
      {spotifyToken === undefined ? (
        <a
          href={`${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${
            import.meta.env.VITE_CLIENT_ID
          }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${
            import.meta.env.VITE_RESPONSE_TYPE
          }`}
        >
          Login to Spotify
        </a>
      ) : (
        <div>
          <SpotifyWebPlayer
            token="
BQB8L_pNX9vPswY_nl7TxegFjN8eaZir0qik9Vz689m-87oPJa4_F32zS5glO7325bU4cyc8jOnXhiHK1gtTpy7REpvDjCm60akx6rvrqRT1VZxC3T-78c5potGEJJbYFFARSGn21Gd7xXypurN2srxcdBYe6Hu1n7FM6UznfVnxEv4UyhL-q9up2QtVGZU9"
            uris="spotify:track:4Dvkj6JhhA12EX05fT7y2e"
            autoPlay
            play
            showSaveIcon
            styles={{
              activeColor: "#fff",
              bgColor: "#333",
              color: "#fff",
              loaderColor: "#fff",
              sliderColor: "#1cb954",
              trackArtistColor: "#ccc",
              trackNameColor: "#fff",
            }}
          />
        </div>
      )}
    </div>
  );
}
