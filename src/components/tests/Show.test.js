import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Show from './../Show'

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

test('renders testShow and no selected Season without errors', () => {
  render(<Show show={testShow} selectedSeason='none' />)

  const showContainer = screen.getByTestId(/show-container/i)
  expect(showContainer).toHaveTextContent(testShow.name)
})

test('renders Loading component when prop show is null', () => {
  render(<Show show={null} />)

  const loadingContainer = screen.getByTestId(/loading-container/i)
  expect(loadingContainer).toBeInTheDocument()
})

test('renders same number of options seasons are passed in', () => {
  render(<Show show={testShow} selectedSeason='none' />)

  const selectOptions = screen.queryAllByTestId(/season-option/i)
  expect(selectOptions).toHaveLength(3)
})

test('handleSelect is called when an season is selected', () => {
  const mockHandleSelect = jest.fn()

  render(<Show show={testShow} selectedSeason='none' handleSelect={mockHandleSelect} />)

  const select = screen.getByTestId(/select/)
  const options = screen.queryAllByTestId(/season-option/i)
  userEvent.selectOptions(select, options[0])

  expect(mockHandleSelect).toHaveBeenCalled()
})

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  const { rerender } = render(<Show show={testShow} selectedSeason='none' handleSelect={null} />)

  let episodesContainer = screen.queryByTestId('episodes-container')
  expect(episodesContainer).not.toBeInTheDocument()

  rerender(<Show show={testShow} selectedSeason={1} handleSelect={null} />)

  episodesContainer = screen.queryByTestId('episodes-container')
  expect(episodesContainer).toBeInTheDocument()
})
