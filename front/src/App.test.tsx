import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

test('fetches mock data and tests components', async () => {
    const { getByTestId } = render(<App />)

    await waitFor(() => {
        const button = getByTestId('click-testing')
        fireEvent.click(button)
        const scoreElement = getByTestId('test-score')
        const titleElement = getByTestId('test-title')
        const authorElement = getByTestId('test-author')
        const numCommentsElement = getByTestId('test-num-comments')

        expect(scoreElement).toHaveTextContent('50589')
        expect(titleElement).toHaveTextContent(/real life consequences/i)
        expect(authorElement).toHaveTextContent(/crushmycamel/i)
        expect(numCommentsElement).toHaveTextContent('1512')
    })
})

// {
//   id: 'yccwhh',
//   thumbnail:
//       'https://b.thumbs.redditmedia.com/wN8M1_ZJvRgf5VL6JwTVkhTnTdscGix5ELqdGOM1PeE.jpg',
//   score: 50589,
//   title: 'real life consequences spotted in california',
//   author: 'CrushMyCamel',
//   url: 'https://i.imgur.com/6pjVEgV.jpg',
//   num_comments: 1512,
//   reso: {
//       url: 'https://external-preview.redd.it/eSs8fS2zjkidG3buuaDugMOkueNIV90WaM1ZAxR1OSM.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=bdc09219b53da2a0bf9297e4bda5ef4975dfd0be',
//       width: 216,
//       height: 270,
//       distance: 76,
//   },
// },
