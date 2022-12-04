import 'bootstrap/dist/css/bootstrap.min.css'
import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'

import { NoteLayout } from './components/layouts/note-layout'
import { NewNote } from './components/NewNote'
import { NoteList } from './components/NoteList'
import { useLocalStorage } from './hooks/use-local-storage'
import { EditNote } from './pages/EditNote'
import { NotePage } from './pages/Note'

type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type Note = {
  id: string
} & NoteData

export type Tag = {
  id: string
  label: string
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id))
      })),
    [notes, tags]
  )

  const onNoteCreate = ({ tags, ...data }: NoteData) => {
    const tagIds = tags.map((tag) => tag.id)
    setNotes((prev: RawNote[]) => [...prev, { ...data, id: uuidV4(), tagIds }])
  }

  const addTag = (tag: Tag) => {
    setTags((prev: Tag[]) => [...prev, tag])
  }

  const onUpdateNote = (id: string, { tags, ...noteData }: NoteData) => {
    const tagIds = tags.map((tag) => tag.id)

    setNotes((prevNotes: Note[]) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, ...noteData, tagIds } : note
      )
    )
  }

  const onNoteDelete = (noteId: string) => {
    setNotes((prevNotes: RawNote[]) =>
      prevNotes.filter((note) => note.id !== noteId)
    )
  }

  const updateTag = (id: string, label: string) => {
    setTags((prevTags: Tag[]) =>
      prevTags.map((tag) => (tag.id === id ? { ...tag, label } : tag))
    )
  }

  const deleteTag = (id: string) => {
    setTags((prevTags: Tag[]) => prevTags.filter((tag) => tag.id !== id))
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              updateTag={updateTag}
              deleteTag={deleteTag}
              notes={notesWithTags}
              availableTags={tags}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              availableTags={tags}
              addTag={addTag}
              onSubmit={onNoteCreate}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<NotePage handleDelete={onNoteDelete} />} />
          <Route
            path="edit"
            element={
              <EditNote
                availableTags={tags}
                addTag={addTag}
                onSubmit={onUpdateNote}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
