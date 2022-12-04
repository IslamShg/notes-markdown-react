import { FC } from 'react'

import { NoteData, Tag } from '../App'
import { NoteForm } from './NoteForm'

type NewNoteProps = {
  onSubmit: (note: NoteData) => void
  addTag: (tag: Tag) => void
  availableTags: Tag[]
}

export const NewNote: FC<NewNoteProps> = ({
  onSubmit,
  addTag,
  availableTags
}) => {
  return (
    <>
      <h1 className="md-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        addTag={addTag}
        availableTags={availableTags}
      />
    </>
  )
}
