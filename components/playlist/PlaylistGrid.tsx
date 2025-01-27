import { SpotifyPlaylist } from '@/types'
import * as css from './styled'

interface PlaylistGridProps {
    playlists: SpotifyPlaylist[]
}

const PlaylistGrid = ({ playlists }: PlaylistGridProps) => {
    return (
        <css.Container>
            <css.Title>Your Playlists</css.Title>
            <css.Grid>
                {playlists?.map((playlist) => (
                    <css.Card key={playlist.id}>
                        <css.StyledImage
                            src={playlist.images[0]?.url || "/fallback-image.png"}
                            alt={playlist.name}
                            width={200}
                            height={200}
                        />
                        <css.PlaylistName>{playlist.name}</css.PlaylistName>
                    </css.Card>
                ))}
            </css.Grid>
        </css.Container>
    )
}
export default PlaylistGrid