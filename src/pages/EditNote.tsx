import { FC } from 'react'

import { NoteData, Tag } from '../App'
import { useNote } from '../components/layouts'
import { NoteForm } from '../components/NoteForm'

type EditNoteProps = {
  onSubmit: (id: string, note: NoteData) => void
  addTag: (tag: Tag) => void
  availableTags: Tag[]
}

export const EditNote: FC<EditNoteProps> = ({
  onSubmit,
  addTag,
  availableTags
}) => {
  const note = useNote()

  return (
    <>
      <h1 className="md-4">Edit Note</h1>
      <NoteForm
        onSubmit={(data) => onSubmit(note?.id, data)}
        title={note?.title}
        markdown={note?.markdown}
        tags={note?.tags}
        addTag={addTag}
        availableTags={availableTags}
      />
    </>
  )
}
