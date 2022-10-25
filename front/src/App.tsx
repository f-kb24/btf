import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import authAPI from 'utils/api'

const App: React.FC = () => {
    const [pics, setPics] = useState<Pic[]>([])

    const [selectedPic, setSelectedPic] = useState<Pic | null>({})

    useEffect(() => {
        ;(async () => {
            const response = await authAPI.getAllPics()
            response && setPics(response)
        })()
    }, [])

    return (
        <Container>
            <Left>
                {pics.map((pic) => (
                    <Element>
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
            <Right></Right>
        </Container>
    )
}

export default App

const Container = styled.div`
    display: flex;
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 300px;
`
const Right = styled.div``

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
