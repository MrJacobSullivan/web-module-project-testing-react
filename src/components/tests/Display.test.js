import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Display from './../Display'

import fetchShow from '../../api/fetchShow'
jest.mock('../../api/fetchShow')

const testShow = {
  name: 'test show name',
  summary: 'test show summary',
  seasons: [
    {
      id: 1,
      name: 'season 1',
      episodes: [],
    },
    {
      id: 2,
      name: 'season 2',
      episodes: [],
    },
    {
      id: 3,
      name: 'season 3',
      episodes: [],
    },
  ],
}

test('renders without any passed in props', () => {
  render(<Display />)
})

test('when fetch button is pressed, Show component will render', async () => {
  fetchShow.mockResolvedValueOnce(testShow)

  render(<Display />)

  const button = screen.getByRole('button')
  userEvent.click(button)

  const shows = await screen.findAllByTestId(/show-container/i)
  expect(shows).toHaveLength(1)
})

test('when fetch button is pressed, correct number of select options are rendered', async () => {
  fetchShow.mockResolvedValue(testShow)
  const mockDisplayFunc = jest.fn()

  render(<Display displayFunc={mockDisplayFunc} />)

  const button = screen.getByRole('button')
  userEvent.click(button)

  const options = await screen.findAllByTestId(/season-option/i)
  expect(options).toHaveLength(3)

  // console.log(mockDisplayFunc)
})

test('when fetch button is pressed, function in props is invoked', async () => {
  fetchShow.mockResolvedValue(testShow)
  const mockDisplayFunc = jest.fn()

  render(<Display displayFunc={mockDisplayFunc} />)

  const button = screen.getByRole('button')
  await act(async () => userEvent.click(button))

  expect(mockDisplayFunc).toHaveBeenCalled()
})
