from TheKinozal import settings
import googleapiclient.discovery

def import_videos(playlist_id):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=settings.GOOGLE_API_KEY)

    request = youtube.playlistItems().list(
        part="snippet",
        playlistId=playlist_id,
        maxResults=200
    )

    videos_all_info = []

    while request is not None:
        response = request.execute()
        videos_all_info += response["items"]
        request = youtube.playlistItems().list_next(request, response)

    videos = list(
        map(
            lambda video: {
                "id": video["snippet"]["resourceId"]["videoId"],
                "name": video["snippet"]["title"],
            },
            videos_all_info
        )
    )

    return videos
