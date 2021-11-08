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

  const selectOptions = screen.queryAllByTestId(/season-option/i)
  userEvent.click(selectOptions[0])

  expect(mockHandleSelect).toHaveBeenCalled()
})

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {})

//Tasks:
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
