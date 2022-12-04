import { FC, FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { v4 as uuidV4 } from 'uuid'

import { NoteData, Tag } from '../App'

type NoteFormProps = {
  addTag: (tag: Tag) => void
  availableTags: Tag[]
  onSubmit: (data: NoteData) => void
} & Partial<NoteData>

export const NoteForm: FC<NoteFormProps> = ({
  onSubmit,
  availableTags,
  addTag,
  title = '',
  markdown = '',
  tags = []
}) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

  const navigate = useNavigate()
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      title: titleRef.current?.value ?? '',
      markdown: markdownRef.current?.value ?? '',
      tags: selectedTags
    })
    navigate('..')
  }

  console.log(selectedTags, 'NoteForm.tsx', 27)

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
            </Form.Group>
            <Form.Control defaultValue={title} ref={titleRef} required />
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label }
                  addTag(newTag)
                  setSelectedTags((prev) => [...prev, newTag])
                }}
                options={availableTags.map(({ label, id }) => ({
                  label,
                  value: id
                }))}
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
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            required
            as="textarea"
            rows={15}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}
