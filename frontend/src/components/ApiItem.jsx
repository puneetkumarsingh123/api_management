export default function ApiItem({ api, onEdit, onDelete }) {
  return (
    <div className="api-card">
      <h3>{api.name}</h3>
      <p><strong>Description:</strong> {api.description}</p>
      <p><strong>Endpoint:</strong> {api.endpoint}</p>
      <p><strong>Method:</strong> {api.method}</p>
      <div className="buttons">
        <button className="edit-btn" onClick={() => onEdit(api)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(api._id)}>Delete</button>
      </div>
    </div>
  );
}
