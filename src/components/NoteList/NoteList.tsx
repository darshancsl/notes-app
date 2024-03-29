import { Badge, Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";
import { Note, Tag } from "../../App";
import "./NoteList.module.css";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

type simplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

const NoteList = ({ availableTags, notes }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => {
            note.tags.some((noteTag) => noteTag.id === tag.id);
          }))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to='/new'>
              <Button variant='primary'>Create Note</Button>
            </Link>
            <Button variant='outline-secondary'>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, id: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, id: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.id };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
        {filteredNotes.map((note) => {
          return (
            <Col key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default NoteList;

function NoteCard({ id, title, tags }: simplifiedNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none card`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className='align-items-center justify-content-center h-100'
        >
          <span className='fs-5'>{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction='horizontal'
              className='justify-content-center flex-wrap'
            >
              {tags.map((tag) => {
                return (
                  <Badge key={tag.id} className='text-truncate'>
                    {tag.label}
                  </Badge>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
