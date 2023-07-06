export const initialState = {
    playlists: [],
    playing: false,
    item: null,
    search_playlist: [],
    artists: [],
    tracks: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
            };
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: [...state.playlists, action.playlists],// Use an array here
            };
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            };
        case 'SET_LIBRARY':
            return {
                ...state,
                library: action.library,
            };
        case 'SET_ARTISTS':
            return {
                ...state,
                artists: [...state.artists, action.artists],
            };
        case "SET_SEARCH_PLAYLISTS":
            return {
                ...state,
                search_playlist: [...state.search_playlist, action.search_playlist]
            };
        default:
            return state;
    }
}

export default reducer;