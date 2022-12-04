import { FC } from 'react'
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'

import { Tag } from '../App'

type EditTagsModalProps = {
  availableTags: Tag[]
  show: boolean
  handleClose: () => void
  updateTag: (tagId: string, tagLabel: string) => void
  deleteTag: (tagId: string) => void
}

export const EditTagsModal: FC<EditTagsModalProps> = ({
  availableTags,
  show,
  handleClose,
  updateTag,
  deleteTag
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={({ target }) => updateTag(tag.id, target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => deleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    {' '}
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
