import {
  CircularProgress,
  CardHeader,
  Card,
  CardActions,
  Button,
} from "@material-ui/core";

export const Notes = ({
  notes = [],
  editingId = null,
  handleEditing,
  handleViewing,
  handleDeleting,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
    }}
  >
    {!!notes?.length &&
      notes.map((note) => {
        let editing = !!editingId && editingId === note.id ? true : false;
        return (
          <Card raised key={note.id} style={{ margin: "5px" }}>
            <CardHeader
              title={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{note.note.slice(0, 10) + "..."}</div>
                  <div>
                    {editing && <CircularProgress thickness={2} size={20} />}
                  </div>
                </div>
              }
            />
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                disabled={editing}
                onClick={() => handleViewing(note.id)}
              >
                View
              </Button>
              <Button
                size="small"
                variant="contained"
                disabled={editing}
                onClick={() => handleEditing(note.id)}
                color="primary"
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="contained"
                disabled={editing}
                onClick={() => handleDeleting(note.id)}
                color="secondary"
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        );
      })}
  </div>
);
