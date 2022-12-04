import React, { FC } from 'react'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'

import { Note } from '../../../App'

type NoteLayoutProps = {
  notes: Note[]
}

export const NoteLayout: FC<NoteLayoutProps> = ({ notes }) => {
  const { id } = useParams()
  const note = notes.find((note) => note.id === id)

  if (!note) {
    return <Navigate to=".." replace />
  }

  return <Outlet context={note} />
}

export const useNote = () => {
  return useOutletContext<Note>()
}
