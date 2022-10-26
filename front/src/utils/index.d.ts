type Pic = {
    id: string
    thumbnail: string
    score: number
    title: string
    author: string
    url: string
    num_comments: number
    reso: { url: string; width: number; height: number }
}

type GetPicturesResponse = {
    pictures: Pic[]
    selected: null | Pic
}
