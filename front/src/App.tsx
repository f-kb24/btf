import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { picsApi, selectionApi } from 'utils/api'

const App: React.FC = () => {
    const [pics, setPics] = useState<Pic[]>([])

    const [selectedPic, setSelectedPic] = useState<Pic | null>(null)

    useEffect(() => {
        ;(async () => {
            const response = await picsApi.getAllPics()
            response && setPics(response.pictures)
            console.log(response?.selected)
            response?.selected && setSelectedPic(response.selected)
            if (response?.selected) {
                setSelectedPic(response.selected)
                // const picture = response.pictures.filter((pic) => {
                //     return pic.id === response.selected
                // })[0]
                // if (picture) {
                //     setSelectedPic(picture)
                // }
            }
        })()
    }, [])

    const setSelected = async (picture: Pic) => {
        if (selectedPic?.id === picture.id) {
            setSelectedPic(null)
            await selectionApi.saveSelection(null)
        } else {
            setSelectedPic(picture)
            await selectionApi.saveSelection(picture.id)
        }
    }

    return (
        <Container>
            <Left>
                {pics.map((pic) => (
                    <Element
                        data-testid={pic.id === 'yccwhh' ? 'click-testing' : ''}
                        key={pic.id}
                        onClick={() => setSelected(pic)}
                    >
                        <div>{pic.score}</div>
                        {pic.thumbnail === 'nsfw' ? (
                            <div>Picture is NSFW</div>
                        ) : (
                            <img src={pic.thumbnail} />
                        )}
                        <div>{pic.title}</div>
                    </Element>
                ))}
            </Left>
            <Right>
                {!selectedPic ? (
                    <SelectDiv data-testid="select">Select a Picture</SelectDiv>
                ) : (
                    <>
                        <div data-testid="test-title">
                            Title:{selectedPic.title}
                        </div>
                        {selectedPic.thumbnail === 'nsfw' ? (
                            <div>Image is NSFW</div>
                        ) : (
                            <img src={selectedPic.thumbnail} />
                        )}
                        <div>
                            URL:
                            <a href={selectedPic.url} target="_blank">
                                {selectedPic.url}
                            </a>
                        </div>
                        <div data-testid="test-score">
                            score:{selectedPic.score}
                        </div>
                        <div data-testid="test-author">
                            author:{selectedPic.author}
                        </div>
                        <div data-testid="test-num-comments">
                            number of comments:{selectedPic.num_comments}
                        </div>
                    </>
                )}
            </Right>
        </Container>
    )
}

export default App

const SelectDiv = styled.div`
    font-size: 2rem;
`

const Container = styled.div`
    display: flex;
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    overflow-y: scroll;
    height: 100vh;
`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Element = styled.div`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
    &:hover {
        background-color: orange;
    }
`
