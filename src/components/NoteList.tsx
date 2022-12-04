import { FC, useCallback, useMemo, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'

import { Note, Tag } from '../App'
import { EditTagsModal } from './edit-tags-modal'
import { NoteCard } from './NoteCard'

type NoteListProps = {
  availableTags: Tag[]
  notes: Note[]
  updateTag: (id: string, label: string) => void
  deleteTag: (id: string) => void
}

export const NoteList: FC<NoteListProps> = ({
  availableTags,
  notes,
  updateTag,
  deleteTag
}) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')
  const [editTagsModalOpen, setEditTagsModalOpen] = useState(false)

  const isNoteMatching = useCallback(
    (note: Note) => {
      const selectedTagsIds = selectedTags.map((tag) => tag.id)
      const noteTagsIds = note.tags.map((tag) => tag.id)

      const isMatchingByTitle =
        !!title || note.title.toLowerCase().includes(title.toLocaleLowerCase())
      const isMatchingBySelect = selectedTagsIds.every((tagId) =>
        noteTagsIds.includes(tagId)
      )

      return isMatchingByTitle || isMatchingBySelect
    },
    [selectedTags, title]
  )

  const filteredNotes = useMemo(
    () => notes.filter(isNoteMatching),
    [notes, isNoteMatching]
  )

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalOpen(true)}
              variant="outline-secondary"
            >
              Edit Tags{' '}
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>Tags</Form.Label>
            <ReactSelect
              // options={availableTags.map(({ label, id }) => ({
              //   label,
              //   value: id
              // }))}
              value={selectedTags.map(({ label, id }) => ({
                label,
                value: id
              }))}
              onChange={(tags) =>
                setSelectedTags(
                  tags.map(({ label, value }) => ({ label, id: value }))
                )
              }
              isMulti
            />
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        show={editTagsModalOpen}
        handleClose={() => setEditTagsModalOpen(false)}
        availableTags={availableTags}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </>
  )
}
