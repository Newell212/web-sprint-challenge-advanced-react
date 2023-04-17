// Write your tests here
import React from 'react';
import AppClass from './AppClass'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'




  


test('sanity', () => {
  expect(true).toBe(true)
})


  describe('checks for DOM elements', () => {
    test('checks for left button', () => {
      render(<AppClass />)
      let left = screen.getByText(/left/i)
      expect(left).toBeInTheDocument();
    })
    test('checks for submit button', () => {
      render(<AppClass />)
      let submit = screen.getByText(/left/i)
      expect(submit).toBeInTheDocument();
    })
    test('checks for right button and clicks it', () => {
      render(<AppClass />)
      let right = screen.getByText(/right/i)
      expect(right).toBeInTheDocument()
      fireEvent.click(right)
    })
    test('checks if steps exists', () => {
      render(<AppClass />)
      let steps = document.querySelector('#steps')
      expect(steps).toBeInTheDocument()
    })
    test('checks for up button', () => {
      render(<AppClass />)
      let up = screen.getByText(/up/i)
      expect(up).toBeInTheDocument()
    })
  })