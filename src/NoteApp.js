import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import {
  Card,
  CardActions,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  CardContent,
} from "@material-ui/core";
import { Notes } from "./Notes";

class NoteApp extends React.Component {
  constructor() {
    super();
    this.state = {
      dialog_content: "",
      current_note: { note: "", id: undefined },
      deleted_ids: [],
      notes: [],
    };
  }

  handleView = (note_id) => {
    let note = this.state.notes.filter(({ id }) => note_id === id)[0] || null,
      dialog_content = "";

    if (note) {
      dialog_content = (
        <>
          <DialogContentText>{note.note}</DialogContentText>
          <DialogActions>
            <Button
              size="small"
              variant="contained"
              onClick={() => this.handleEdit(note.id)}
              color="primary"
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => this.handleDelete(note.id)}
              secondary
            >
              Delete
            </Button>
          </DialogActions>
        </>
      );
    } else {
      dialog_content = "Note not found!";
    }
    this.setState({ ...this.state, dialog_content });
  };

  handleChangeText = (note) => {
    this.setState({ current_note: { ...this.state.current_note, note } });
  };

  getCurrentNode = () => {
    return this.state.current_note.note;
  };

  handleSave = () => {
    let { current_note, notes, deleted_ids, dialog_content } = this.state,
      new_notes = [];
    if (current_note.note) {
      if (current_note.id) {
        new_notes = notes.map((note) => {
          if (note.id === current_note.id) {
            return { note: current_note.note, id: note.id };
          } else {
            return note;
          }
        });
      } else {
        let id = deleted_ids[0] || notes.length + 1;
        deleted_ids = deleted_ids.slice(1);
        new_notes = [...notes, { ...current_note, id }];
      }
    } else {
      dialog_content = "Nothing to save!";
    }
    this.setState({
      ...this.state,
      notes: new_notes,
      current_note: { note: "", id: undefined },
      deleted_ids,
      dialog_content,
    });
  };

  handleDelete = (note_id) => {
    let { deleted_ids, notes } = this.state;
    notes = notes.filter(({ id }) => id !== note_id);
    deleted_ids = [...deleted_ids, note_id];
    this.setState({ ...this.state, deleted_ids, notes }, () => {
      this.state.dialog_content && this.clearDialogContent();
    });
  };

  clearDialogContent = () => {
    this.setState({ ...this.state, dialog_content: "" });
  };

  handleEdit = (note_id) => {
    let { notes, current_note, dialog_content } = this.state;
    current_note = notes.filter(({ id }) => id === note_id)[0] || {
      note: "",
      id: undefined,
    };
    dialog_content = "";
    if (!current_note.id) {
      dialog_content = "Note not found in the registry.";
    }
    this.setState({ ...this.state, current_note, dialog_content });
  };

  render() {
    let { notes } = this.state;
    return (
      <>
        <Card>
          <CardContent>
            <TextField
              label="Take a note here ..."
              multiline={true}
              variant="filled"
              fullWidth
              rows={8}
              rowsMax={4}
              onChange={({ target: { value } }) => {
                this.handleChangeText(value);
              }}
              value={this.getCurrentNode()}
              margin="dense"
              autoFocus
            />
          </CardContent>
          <CardActions style={{ flexDirection: "row-reverse" }}>
            <Button
              size="large"
              variant="contained"
              onClick={this.handleSave}
              color="primary"
              disabled={this.state.current_note.note ? false : true}
            >
              Save
            </Button>
          </CardActions>
        </Card>
        <Notes
          notes={notes}
          editingId={this.state?.current_note?.id}
          handleEditing={this.handleEdit}
          handleDeleting={this.handleDelete}
          handleViewing={this.handleView}
        />
        <Dialog
          open={this.state.dialog_content ? true : false}
          onClose={this.clearDialogContent}
          maxWidth="md"
        >
          <DialogTitle>View Note</DialogTitle>
          <DialogContent>{this.state.dialog_content}</DialogContent>
        </Dialog>
      </>
    );
  }
}

export default NoteApp;
