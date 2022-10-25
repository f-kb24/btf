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
            if (response?.selected) {
                const picture = response.pictures.filter((pic) => {
                    return pic.id === response.selected
                })[0]
                if (picture) {
                    setSelectedPic(picture)
                }
            }
        })()
    }, [])

    const setSelected = async (picture: Pic) => {
        const response = await selectionApi.saveSelection(picture.id)
        console.log(response)
        if (selectedPic?.id === picture.id) {
            setSelectedPic(null)
        } else {
            setSelectedPic(picture)
        }
    }

    return (
        <Container>
            <Left>
                {pics.map((pic) => (
                    <Element key={pic.id} onClick={() => setSelected(pic)}>
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
                    <SelectDiv>Select a Picture</SelectDiv>
                ) : (
                    <>
                        <div>Title:{selectedPic.title}</div>
                        <img src={selectedPic.thumbnail} />
                        <div>URL:{selectedPic.url}</div>
                        <div>score:{selectedPic.score}</div>
                        <div>author:{selectedPic.author}</div>
                        <div>number of comments:{selectedPic.num_comments}</div>
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
