import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

// main router
function RootComponent() {
  return (
    <React.Fragment>
      
      <Outlet />
    </React.Fragment>
  )
}
