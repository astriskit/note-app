import React from "react";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import CircularProgress from "material-ui/CircularProgress";
import { Card, CardText, CardActions } from "material-ui/Card";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
class NoteApp extends React.Component {
  constructor() {
    super();
    this.state = {
      dialog_content: "",
      current_note: { note: "", id: undefined },
      deleted_ids: [],
      notes: []
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.getCurrentNode = this.getCurrentNode.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearDialogContent = this.clearDialogContent.bind(this);
    this.handleView = this.handleView.bind(this);
  }
  handleView(note_id) {
    let note = this.state.notes.filter(({ id }) => note_id === id)[0] || null,
      dialog_content = "";
    if (note) {
      dialog_content = (
        <div>
          <div>{note.note}</div>
          <div>
            <FlatButton
              label="Edit"
              onClick={() => this.handleEdit(note.id)}
              primary
            />
            <FlatButton
              label="Delete"
              onClick={() => this.handleDelete(note.id)}
              secondary
            />
          </div>
        </div>
      );
    } else {
      dialog_content = "Note not found!";
    }
    this.setState({ ...this.state, dialog_content });
  }
  handleChangeText(note) {
    this.setState({ current_note: { ...this.state.current_note, note } });
  }
  getCurrentNode() {
    return this.state.current_note.note;
  }
  handleSave() {
    let { current_note, notes, deleted_ids, dialog_content } = this.state,
      new_notes = [];
    if (current_note.note) {
      if (current_note.id) {
        new_notes = notes.map(note => {
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
      dialog_content
    });
  }
  handleDelete(note_id) {
    let { deleted_ids, notes } = this.state;
    notes = notes.filter(({ id }) => id !== note_id);
    deleted_ids = [...deleted_ids, note_id];
    this.setState({ ...this.state, deleted_ids, notes });
  }
  clearDialogContent() {
    this.setState({ ...this.state, dialog_content: "" });
  }
  handleEdit(note_id) {
    let { notes, current_note, dialog_content } = this.state;
    current_note = notes.filter(({ id }) => id === note_id)[0] || {
      note: "",
      id: undefined
    };
    dialog_content = "";
    if (!current_note.id) {
      dialog_content = "Note not found in the registry.";
    }
    this.setState({ ...this.state, current_note, dialog_content });
  }
  render() {
    let { notes } = this.state;
    return (
      <MuiThemeProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              justifyContent: "space-evenly"
            }}
          >
            <div>
              <TextField
                floatingLabelText="Take a note here ..."
                multiLine={true}
                fullWidth={true}
                rowsMax={4}
                onChange={(e, current_note) => {
                  this.handleChangeText(current_note);
                }}
                value={this.getCurrentNode()}
              />
            </div>
            <div>
              <RaisedButton
                fullWidth
                label="save"
                onClick={this.handleSave}
                primary
                disabled={this.state.current_note.note ? false : true}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexGrow: "3"
            }}
          >
            {notes &&
              notes.map(note => {
                let editing =
                  this.state.current_note.id &&
                  this.state.current_note.id === note.id
                    ? true
                    : false;
                return (
                  <div key={note.id} style={{ margin: "5px" }}>
                    <Card>
                      <CardText
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <div>{note.note.slice(0, 10) + "..."}</div>
                        <div>
                          {editing && (
                            <CircularProgress thickness={2} size={20} />
                          )}
                        </div>
                      </CardText>
                      <CardActions>
                        <FlatButton
                          label="View"
                          primary
                          disabled={editing}
                          onClick={() => this.handleView(note.id)}
                        />
                        <FlatButton
                          label="Edit"
                          disabled={editing}
                          onClick={() => this.handleEdit(note.id)}
                          primary
                        />
                        <FlatButton
                          label="Delete"
                          disabled={editing}
                          onClick={() => this.handleDelete(note.id)}
                          secondary
                        />
                      </CardActions>
                    </Card>
                  </div>
                );
              })}
          </div>
          <Dialog
            open={this.state.dialog_content ? true : false}
            onRequestClose={this.clearDialogContent}
            title="Note-app alert"
          >
            {this.state.dialog_content}
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default NoteApp;
