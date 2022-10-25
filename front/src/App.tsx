import React, { useEffect } from 'react'
import styled from 'styled-components'
import authAPI from 'utils/api'

const App: React.FC = () => {
    useEffect(() => {
        ;(async () => {
            const response = await authAPI.createUser({
                name: 'foo',
                email: 'foo@bar.com',
            })
            console.log(response)
        })()
    }, [])
    return (
        <Container>
            <div>hi</div>
        </Container>
    )
}

export default App

const Container = styled.div``
