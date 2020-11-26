from TheKinozal import settings
import googleapiclient.discovery
from googleapiclient.http import MediaInMemoryUpload

def upload_first_chunk(djfile, title):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=settings.GOOGLE_API_KEY)

    body = {
        "snippet": {
            "title": title
        }
    }

    request = youtube.videos().insert(
        part="snippet",
        body=body,
        media_body=MediaInMemoryUpload(djfile, chunksize=settings.CHUNK_SIZE, resumable=True)
    )

    status, response = request.next_chunk()
    return request, response

def finish_upload(request, response):
    current_res = response

    while response is None:
        status, response = request.next_chunk()

        if response is not None:
            return response.get("id")
